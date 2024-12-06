import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import "./App.css";
import { JobBody } from "./components/JobBody";
import { JobHeader } from "./components/JobHeader";
import { db } from "./services/firebase";

export interface IJob {
  source: string;
  title: string;
  company: string;
  location: string;
  category: string;
  link: string;
  createdAt: Timestamp;
}

function App() {
  // const jobs: IJob[] = [
  //   job1,
  //   job2,
  //   job3,
  //   job4,
  //   job5,
  //   job6,
  //   job7,
  //   job8,
  //   job9,
  //   job1,
  //   job2,
  //   job3,
  //   job4,
  //   job5,
  //   job6,
  //   job7,
  //   job8,
  //   job9,
  // ];

  const [jobs, setJobs] = useState<IJob[]>([]);
  const jobsCollection = collection(db, "vacancies");

  const getJobs = async () => {
    const dataJobs = await getDocs(jobsCollection);
    const jobsArray: IJob[] = dataJobs.docs.map((doc) => {
      return doc.data() as IJob;
    });
    setJobs(jobsArray);
  };

  const [string, setString] = useState("");
  const filteredJobs = jobs.filter(
    (job) =>
      job.category.toLowerCase().includes(string.toLowerCase()) ||
      job.title.toLowerCase().includes(string.toLowerCase())
  );

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="maincontainer">
      <div className="jobheader">
        <JobHeader setString={setString} />
      </div>
      <div className="jobbodycontainer">
        {filteredJobs.map((job, index) => (
          <div className="jobs" key={index}>
            <JobBody job={job} />
            <div className="stylesButtonContainer">
              <button>Ver Detalhes...</button>
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
//   link: "https://www.criticaltechworks.com/",
//   createdAt: Timestamp.now(),
//   //   description:
//   //     "Estamos a procura de um FrontEnd Developer com conhecimentos em React para integrar a nossa equipaprocura de um FrontEnd Developer com conhecimentos em React para integrar a nossa equipa",
// };
// const job2: IJob = {
//   source: "Olx",
//   title: "BackEnd Developer",
//   company: "Google",
//   location: "Lisboa",
//   category: "Tecnologia",
//   link: "https://www.google.com/",
//   createdAt: Timestamp.now(),
//   // description: "Estamos a procura de um BackEnd Developer",
// };

// const job3: IJob = {
//   source: "Olx",
//   title: "FullStack Developer",
//   company: "Critical Techworks",
//   location: "Lisboa",
//   category: "Tecnologia",
//   link: "https://www.criticaltechworks.com/",
//   createdAt: Timestamp.now(),
//   // description: "Estamos a procura de um FullStack Developer",
// };

// const job4: IJob = {
//   source: "Olx",
//   title: "IT Developer",
//   company: "Santander",
//   location: "Porto",
//   category: "Tecnologia",
//   link: "https://www.santander.pt/",
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
