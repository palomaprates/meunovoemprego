import { ChangeEvent, useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import "./App.css";
import { JobBody } from "./components/JobBody";
import { JobHeader } from "./components/JobHeader";
import { db, functions } from "./services/firebase";
import { JobsFilter } from "./components/JobsFilter";

export interface IJob {
  id: number;
  nome: string;
  source: string;
  name: string;
  company: string;
  location: string;
  category: string;
  href: string;
  createdAt: Timestamp;
}

function App() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const jobsCollection = collection(db, "vacancies");
  const getJobs = async () => {
    const dataJobs = await getDocs(jobsCollection);
    console.log(dataJobs.size);
    const jobsArray: IJob[] = dataJobs.docs.map((doc) => {
      return doc.data() as IJob;
    });
    setJobs(jobsArray);
  };

  const [searchInput, setSearchInput] = useState("");

  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredJobs = jobs.filter(
    (j) =>
      (j.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
        j.company?.toLowerCase().includes(searchInput.toLowerCase())) &&
      j.location?.toLowerCase().includes(locationFilter.toLowerCase()) &&
      j.category?.toLowerCase().includes(categoryFilter.toLowerCase())
  );

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="maincontainer">
      <JobHeader
        setSearchInput={setSearchInput}
        setLocationFilter={setLocationFilter}
        setCategoryFilter={setCategoryFilter}
      />
      <div className="filterMobile">
        <JobsFilter
          setLocationFilter={setLocationFilter}
          setCategoryFilter={setCategoryFilter}
        />
      </div>
      <div className="jobbodycontainer">
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
      </div>
    </div>
  );
}

export default App;

// const job1: IJob = {
//   source: "Olx",
//   title: "FrontEnd Developer",
//   company: "Critical Techworks",
//   location: "Lisboa",
//   category: "Tecnologia",
//   href: "https://www.criticaltechworks.com/",
//   createdAt: Timestamp.now(),
//   //   description:
//   //     "Estamos a procura de um FrontEnd Developer com conhecimentos em React para integrar a nossa equipaprocura de um FrontEnd Developer com conhecimentos em React para integrar a nossa equipa",
// };
// const job: IJob = {
//   source: "Olx",
//   title: "BackEnd Developer",
//   company: "Google",
//   location: "Lisboa",
//   category: "Tecnologia",
//   href: "https://www.google.com/",
//   createdAt: Timestamp.now(),
//   // description: "Estamos a procura de um BackEnd Developer",
// };

// const job3: IJob = {
//   source: "Olx",
//   title: "FullStack Developer",
//   company: "Critical Techworks",
//   location: "Lisboa",
//   category: "Tecnologia",
//   href: "https://www.criticaltechworks.com/",
//   createdAt: Timestamp.now(),
//   // description: "Estamos a procura de um FullStack Developer",
// };

// const job4: IJob = {
//   source: "Olx",
//   title: "IT Developer",
//   company: "Santander",
//   location: "Porto",
//   category: "Tecnologia",
//   href: "https://www.santander.pt/",
//   createdAt: Timestamp.now(),
//   // description: "Estamos a procura de um IT Developer",
// };

// const job5: IJob = {
//   source: "Olx",
//   title: "FrontEnd Developer",
//   company: "Critical Techworks",
//   location: "Porto",
//   category: "Tecnologia",
//   link: "https://www.criticaltechworks.com/",
//   createdAt: Timestamp.now(),
//   // description: "Estamos a procura de um FrontEnd Developer",
// };
// const job6: IJob = {
//   source: "Olx",
//   title: "BackEnd Developer",
//   company: "BPI",
//   location: "Lisboa",
//   category: "Tecnologia",
//   link: "https://www.bancobpi.pt/",
//   createdAt: Timestamp.now(),
//   // description: "Estamos a procura de um BackEnd Developer",
// };

// const job7: IJob = {
//   source: "Olx",
//   title: "IT Developer",
//   company: "Santander",
//   location: "Porto",
//   category: "Tecnologia",
//   link: "https://www.santander.pt/",
//   createdAt: Timestamp.now(),
//   // description: "Estamos a procura de um IT Developer",
// };

// const job8: IJob = {
//   source: "Olx",
//   title: "FrontEnd Developer",
//   company: "Critical Techworks",
//   location: "Porto",
//   category: "Tecnologia",
//   link: "https://www.criticaltechworks.com/",
//   createdAt: Timestamp.now(),
//   // description: "Estamos a procura de um FrontEnd Developer",
// };
// const job9: IJob = {
//   source: "Olx",
//   title: "BackEnd Developer",
//   company: "BPI",
//   location: "Lisboa",
//   category: "Tecnologia",
//   link: "https://www.bancobpi.pt/",
//   createdAt: Timestamp.now(),
//   // description: "Estamos a procura de um BackEnd Developer",
// };
