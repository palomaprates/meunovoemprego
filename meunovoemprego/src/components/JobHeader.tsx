import { IoSearch } from "react-icons/io5";
import { JobLogo } from "./JobLogo";
import { IJob } from "../App";

export function JobHeader({
  setJobs,
}: {
  setJobs: React.Dispatch<React.SetStateAction<IJob[]>>;
}) {
  return (
    <div className="jobHeaderStyle">
      <div className="jobLogoStyle">
        <JobLogo />
      </div>
      <div className="searchBar">
        <div className="searchBarInput">
          <input
            type="text"
            className="inputStyle"
            placeholder="Digite sua pesquisa..."
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              setJobs((prevJobs) =>
                prevJobs.filter((job) =>
                  job.title.toLowerCase().includes(searchTerm)
                )
              );
            }}
          />
        </div>
        <div>
          <button className="searchBarButton">
            <IoSearch />
          </button>
        </div>
      </div>
    </div>
  );
}

// const JobHeaderStyle: CSSProperties = {
//   display: "flex",
//   justifyContent: "start",
//   alignItems: "center",
//   width: "100%",
//   //   border: "2px solid red",
//   gap: "200px",
// };
// const JobLogoStyle: CSSProperties = {
//   display: "flex",
//   justifyContent: "start",
//   alignItems: "center",
// };
// const searchBar: CSSProperties = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   alignSelf: "center",
//   width: "400px",
//   height: "20px",
//   boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
//   borderRadius: "8px",
//   padding: "10px",
//   backgroundColor: "white",
// };

// const searchBarInput: CSSProperties = {
//   flex: "1",
// };

// const inputStyle: CSSProperties = {
//   display: "flex",
//   justifyContent: "center",
//   width: "100%",
//   border: "none",
//   outline: "none",
//   padding: "5px",
//   backgroundColor: "transparent",
//   color: "black",
// };

// const searchBarButton: CSSProperties = {
//   display: "flex",
//   justifyContent: "center",
//   background: "none",
//   border: "none",
//   cursor: "pointer",
//   padding: "5px",
//   fontSize: "16px",
//   borderRadius: "0 20px 20px 0",
//   color: "black",
// };
