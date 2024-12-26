import { ChangeEvent } from "react";
import { MdOutlineWork, MdPlace } from "react-icons/md";

export function JobsFilter({
  setLocationFilter,
  setCategoryFilter,
}: {
  setLocationFilter: (value: string) => void;
  setCategoryFilter: (value: string) => void;
}) {
  const states = [
    "Aveiro",
    "Braga",
    "Coimbra",
    "Faro",
    "Leiria",
    "Lisboa",
    "Porto",
    "Santarém",
    "Setúbal",
    "Viseu",
  ];
  const categories = [
    "Assistente de Loja",
    "Call Center",
    "Domésticos e Limpezas",
    "Fabrico",
    "IT e Telecomunicações",
    "Marketing",
    "Obras",
    "Restauração",
    "Saúde e Beleza",
    "Transportes e Logística",
    "Vendas",
  ];

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
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
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
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
