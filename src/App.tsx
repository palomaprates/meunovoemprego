import { useEffect, useState, useRef } from "react";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore";
import "./App.css";
import { JobBody } from "./components/JobBody";
import { JobHeader } from "./components/JobHeader";
import { db } from "./services/firebase";
import { JobsFilter } from "./components/JobsFilter";
import { getTrigramQueries } from "../utils/getTrigramQueries";

export interface IJob {
  source: string;
  name: string;
  company: string;
  location: string;
  category: string;
  href: string;
  createdAt: Timestamp;
  index: { [key: string]: boolean };
}

function App() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const jobsCollection = collection(db, "vacancies");

  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<
    DocumentData,
    DocumentData
  > | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const PAGE_SIZE = 10;

  const getInitialJobs = async () => {
    let q = query(jobsCollection, limit(PAGE_SIZE));

    if (searchInput && searchInput.length < 3) {
      q = query(q, where("name", ">=", searchInput));
      q = query(q, where("name", "<=", searchInput + "\uf8ff"));
    } else {
      q = query(
        jobsCollection,
        limit(PAGE_SIZE),
        ...getTrigramQueries(
          searchInput
            .toLocaleLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
          "index"
        )
      );
    }

    if (categoryFilter) q = query(q, where("category", "==", categoryFilter));
    if (locationFilter) q = query(q, where("location", "==", locationFilter));

    setLoading(true);
    const dataJobs = await getDocs(q);
    const jobsArray: IJob[] = dataJobs.docs.map((doc) => {
      return doc.data() as IJob;
    });
    setLastDoc(dataJobs.docs[dataJobs.docs.length - 1]);
    setJobs(jobsArray);
    setLoading(false);
  };

  const getNextJobs = async () => {
    if (!lastDoc) return;
    let q = query(jobsCollection, limit(PAGE_SIZE));

    if (searchInput && searchInput.length < 3) {
      q = query(q, where("name", ">=", searchInput));
      q = query(q, where("name", "<=", searchInput + "\uf8ff"));
    } else {
      q = query(
        jobsCollection,
        limit(PAGE_SIZE),
        ...getTrigramQueries(
          searchInput
            .toLocaleLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
          "index"
        )
      );
    }

    if (categoryFilter) q = query(q, where("category", "==", categoryFilter));
    if (locationFilter) q = query(q, where("location", "==", locationFilter));

    q = query(q, startAfter(lastDoc));
    setLoading(true);
    const dataJobs = await getDocs(q);
    const jobsArray: IJob[] = dataJobs.docs.map((doc) => {
      return doc.data() as IJob;
    });
    setLastDoc(dataJobs.docs[dataJobs.docs.length - 1]);
    setJobs([...jobs, ...jobsArray]);
    setLoading(false);
  };

  const filteredJobs = jobs.filter(
    (j) =>
      (j.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
        j.company?.toLowerCase().includes(searchInput.toLowerCase())) &&
      j.location?.toLowerCase().includes(locationFilter.toLowerCase()) &&
      j.category?.toLowerCase().includes(categoryFilter.toLowerCase())
  );

  const handleScroll = () => {
    const element = divRef.current;
    if (element) {
      const isAtBottom =
        element.scrollHeight - element.scrollTop === element.clientHeight;

      if (isAtBottom) {
        getNextJobs();
      }
    }
  };
  useEffect(() => {
    getInitialJobs();
  }, [locationFilter, categoryFilter, searchInput]);

  return (
    <div className="maincontainer">
      <JobHeader
        setSearchInput={setSearchInput}
        setLocationFilter={setLocationFilter}
        setCategoryFilter={setCategoryFilter}
      />
      <div className="jobbodycontainer" ref={divRef} onScroll={handleScroll}>
        <div className="filterMobile">
          <JobsFilter
            setLocationFilter={setLocationFilter}
            setCategoryFilter={setCategoryFilter}
          />
        </div>
        {filteredJobs.map((job, index) => (
          <div className="jobs" key={index}>
            <JobBody job={job} />
            <div className="stylesButtonContainer">
              <a href={job.href}>
                <button className="btn-test">Ver Detalhes...</button>
              </a>
            </div>
          </div>
        ))}
        {loading ? (
          <div
            style={{ display: "flex", justifyContent: "center", width: 500 }}
          >
            <span>Carregando...</span>{" "}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
