/*import type { budgetType, budgetTypeArray } from "../../types/budgetType";

// nous sommes Bosila || event id = 1
const listUser = [
  { id: 1, name: "Yoan" },
  { id: 1, name: "Bosila" },
  { id: 1, name: "Michel" },
];

const listBudget: budgetTypeArray = [
  {
    id: 1,

    name: "Billetterie Stripe",
    price: 450,
    creation_date: "",

    id_event: 1,
    id_user: 1,
  },
  {
    id: 2,

    name: "",
    price: 1200,
    creation_date: "",

    id_event: 1,
    id_user: 2,
  },
  {
    id: 3,

    name: "",
    price: 2000,
    creation_date: "",

    id_event: 1,
    id_user: 3,
  },
];*/

function Budget() {
  return (
    <div>
      <header>
        <h1>Nom de l'event</h1>
        <button type="button"> Ajouter une dépense </button>
      </header>

      <section>
        <article>
          <div> tu dois +1285.00 € A yoan</div>
        </article>
        <article>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-arrow-down-icon lucide-arrow-down"
            aria-hidden="true"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
          <p> dépense globales </p>
          <div> 12 450 € </div>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-up-icon lucide-arrow-up"
              aria-hidden="true"
            >
              <path d="m5 12 7-7 7 7" />
              <path d="M12 19V5" />
            </svg>
            <p> mes dépense</p>
            <div> 5 165 € </div>
          </div>
        </article>
      </section>

      <section>
        <div>
          <div>
            <div>
              <span>Billetterie Stripe</span>
              <span>+450,00 €</span>
            </div>

            <div>
              <span>Location Salle</span>
              <span>-1200,00 €</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Budget;
