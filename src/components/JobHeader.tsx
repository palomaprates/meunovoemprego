import { IoSearch } from "react-icons/io5";
import { JobLogo } from "./JobLogo";
import { JobsFilter } from "./JobsFilter";

export function JobHeader({
  setSearchInput,
  setLocationFilter,
  setCategoryFilter,
}: {
  setSearchInput: (value: string) => void;
  setLocationFilter: (value: string) => void;
  setCategoryFilter: (value: string) => void;
}) {
  return (
    <>
      <div
        className="jobheader"
        style={{
          height: "80px",
          width: "100%",
          backgroundColor: "#2c3e50",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <JobLogo />

        <div className="searchBar">
          <div className="searchBarInput">
            <input
              type="text"
              className="inputStyle"
              placeholder="Digite sua pesquisa..."
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
          </div>
          <div>
            <button className="searchBarButton">
              <IoSearch />
            </button>
          </div>
        </div>
        <div
          className="filterDesktop"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <JobsFilter
            setLocationFilter={setLocationFilter}
            setCategoryFilter={setCategoryFilter}
          />
        </div>
      </div>
    </>
  );
}
