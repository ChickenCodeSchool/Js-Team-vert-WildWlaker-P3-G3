import type { FilterProps } from "../../types/Events";
import "./Filter.css";

function Filter({ activeFilter, onFilterChange }: FilterProps) {
  return (
    <fieldset className="Filter-Global" aria-label="Filtrer les évènements">
      <legend className="Filter-Legend">Filtrer les évènements</legend>
      <div className="Filter-ButtonGlobal">
        <button
          type="button"
          className={`Filter-Button ${activeFilter === "ongoing" ? "Filter-Button--active" : ""}`}
          onClick={() => onFilterChange("ongoing")}
        >
          En cours
        </button>
      </div>
      <div className="Filter-ButtonGlobal">
        <button
          type="button"
          className={`Filter-Button ${activeFilter === "finished" ? "Filter-Button--active" : ""}`}
          onClick={() => onFilterChange("finished")}
        >
          Terminés
        </button>
      </div>
      <div className="Filter-ButtonGlobal">
        <button
          type="button"
          className={`Filter-Button ${activeFilter === "all" ? "Filter-Button--active" : ""}`}
          onClick={() => onFilterChange("all")}
        >
          Tous
        </button>
      </div>
    </fieldset>
  );
}

export default Filter;
