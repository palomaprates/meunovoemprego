import { ChangeEvent } from "react";
import { MdOutlineWork, MdPlace } from "react-icons/md";

export function JobsFilter({
  setLocationFilter,
  setCategoryFilter,
}: {
  setLocationFilter: (value: string) => void;
  setCategoryFilter: (value: string) => void;
}) {
  const states = ["Lisboa", "Aveiro", "Braga"];
  const categories = ["Restauração", "Programação", "Call Center"];

  function handleSelectedLocation(event: ChangeEvent<HTMLSelectElement>) {
    setLocationFilter(event.target.value);
  }
  function handleSelectedCategory(event: ChangeEvent<HTMLSelectElement>) {
    setCategoryFilter(event.target.value);
  }
  return (
    <div className="job-filter-container">
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <div className="job-filter">
          <MdPlace color="black" />
          <select
            name="locationFilter"
            id="locationFilter"
            onChange={handleSelectedLocation}
          >
            <option id="optionLocation" value="0">
              Localização
            </option>
            {states.map((state) => (
              <option value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className="job-filter">
          <MdOutlineWork color="black" />
          <select
            name="categoryFilter"
            id="categoryFilter"
            onChange={handleSelectedCategory}
          >
            <option id="optionCategory" value="0">
              Categoria
            </option>
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
