import { IoSearch } from "react-icons/io5";
import { JobLogo } from "./JobLogo";
import { JobsFilter } from "./JobsFilter";

export function JobHeader({
  searchInput,
  setSearchInput,
  setLocationFilter,
  setCategoryFilter,
}: {
  searchInput: string;
  setSearchInput: (value: string) => void;
  setLocationFilter: (value: string) => void;
  setCategoryFilter: (value: string) => void;
}) {
  return (
    <>
      <div className="jobheader">
        <div className="logoContainer">
          <JobLogo />
        </div>

        <div className="searchBar">
          <div className="searchBarInput">
            <input
              type="text"
              value={searchInput}
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
        <div className="filterDesktop">
          <JobsFilter
            setLocationFilter={setLocationFilter}
            setCategoryFilter={setCategoryFilter}
          />
        </div>
      </div>
    </>
  );
}
