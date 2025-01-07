import { useEffect, useState, useRef } from "react";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  setDoc,
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
import { JobSubheading } from "./components/JobSubheading";
import { parseAsString, useQueryState } from "nuqs";
import { CircularProgress } from "@mui/material";

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
  const [searchInput, setSearchInput] = useQueryState(
    "searchInput",
    parseAsString.withDefault("")
  );
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const jobsCollection = collection(db, "vacancies");

  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<
    DocumentData,
    DocumentData
  > | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const PAGE_SIZE = 20;

  const getInitialJobs = async () => {
    let q = query(jobsCollection, limit(PAGE_SIZE));

    q = query(q, orderBy("createdAt", "desc"));
    if (searchInput && searchInput.length < 3) {
      q = query(q, where("name", ">=", searchInput));
      q = query(q, where("name", "<=", searchInput + "\uf8ff"));
    } else if (searchInput && searchInput.length >= 3) {
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
    console.log(jobsArray);
    setLastDoc(dataJobs.docs[dataJobs.docs.length - 1]);
    setJobs(jobsArray);
    setLoading(false);
  };

  const getNextJobs = async () => {
    if (!lastDoc) return;
    let q = query(jobsCollection, limit(PAGE_SIZE));

    q = query(q, orderBy("createdAt", "desc"));
    if (searchInput && searchInput.length < 3) {
      q = query(q, where("name", ">=", searchInput));
      q = query(q, where("name", "<=", searchInput + "\uf8ff"));
    } else if (searchInput && searchInput.length >= 3) {
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

  const handleScroll = () => {
    const element = divRef.current;
    if (element) {
      const isNearBottom =
        element.scrollHeight - element.scrollTop - element.clientHeight < 50;
      if (isNearBottom) {
        getNextJobs();
      }
    }
  };

  const saveLog = async () => {
    let total = 0;
    const ref = doc(db, "logs", "visits");
    const snap = await getDoc(ref);
    if (snap.exists()) total = snap.data().total + 1;
    await setDoc(ref, { total: total });
  };

  useEffect(() => {
    getInitialJobs();
  }, [locationFilter, categoryFilter, searchInput]);

  useEffect(() => {
    saveLog();
  }, []);

  return (
    <div className="maincontainer">
      <JobHeader
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setLocationFilter={setLocationFilter}
        setCategoryFilter={setCategoryFilter}
      />
      <JobSubheading />
      <div className="filterMobile">
        <JobsFilter
          setLocationFilter={setLocationFilter}
          setCategoryFilter={setCategoryFilter}
        />
      </div>
      <div
        className="jobbodycontainer scrollbar-hide"
        ref={divRef}
        onScroll={handleScroll}
      >
        {!loading && !jobs.length && (
          <span>Não há vagas com os filtros selecionados</span>
        )}
        {jobs.map((job, index) => (
          <div className="jobs" key={index}>
            <JobBody job={job} />
            <div className="stylesButtonContainer">
              <a href={job.href}>
                <button className="custom-btn">Ver Detalhes...</button>
              </a>
            </div>
          </div>
        ))}
      </div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 10,
            color: "#094f9e",
          }}
        >
          <CircularProgress color="inherit" size={20} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
