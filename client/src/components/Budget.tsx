import "./Budget.css";

import {
  ArrowDown,
  ArrowUp,
  FilePlusCorner,
  Plus,
  History,
} from "lucide-react";

function Budget() {
  return (
    <div className="budget">
      <header>
        <h1>Nom de l'event</h1>
        <button type="button">
          <FilePlusCorner size={20} />
          <span> Ajouter une dépense</span>
        </button>
      </header>

      <section className="monEquilibres">
        <article className="monEquilibresBox">
          <span> tu dois </span>
          <h2>+1 285,00 €</h2>
          <small>
            <History /> last update : yesterday
          </small>
        </article>

        <article className="total">
          <div className="positif">
            <ArrowDown size={20} className="lucid" /> <br />
            <span> dépense globales </span>
            <h3> 12 450 € </h3>
          </div>

          <div className="negatif">
            <ArrowUp size={20} className="lucid" /> <br />
            <span> mes dépenses</span>
            <h3> 5 165 € </h3>
          </div>
        </article>
      </section>

      <section className="depensesEquilibres">
        <div className="depenses">
          <div className="mobileDepenses">
            <h5>Dépenses</h5> <button type="button"> voir plus</button>
          </div>
          <section>
            <article>
              <span>Billetterie Stripe</span>
              <span className="positif">+450,00 €</span>
            </article>

            <article>
              <span>Location Salle</span>
              <span className="negatif">-1200,00 €</span>
            </article>

            <article>
              <span>Sponsor TechCorp</span>
              <span className="positif">-1200,00 €</span>
            </article>
          </section>
        </div>

        <div className="equilibres">
          <h5>Equilibres</h5>
          <section>
            <article>
              <span>Yoan</span>
              <span className="positif">+450,00 €</span>
            </article>

            <article>
              <span>Bosila</span>
              <span className="negatif">-1200,00 €</span>
            </article>

            <article>
              <span>Michel</span>
              <span className="positif">+1200,00 €</span>
            </article>
          </section>
        </div>
      </section>

      <button type="button" className="plusButton">
        <Plus size={20} />
      </button>
    </div>
  );
}

export default Budget;
