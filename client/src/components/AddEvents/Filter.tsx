import type { FilterProps } from "../../types/Events";
import "./Filter.css";

function Filter({ activeFilter, onFilterChange }: FilterProps) {
  return (
    <div className="Filter-Global">
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
    </div>
  );
}

export default Filter;
