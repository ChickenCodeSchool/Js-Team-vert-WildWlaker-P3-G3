import "./Budget.css";

import { ArrowDown, ArrowUp, FilePlusCorner } from "lucide-react";

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
          <h2>+1285.00 €</h2>
          <small> dernier update </small>
        </article>

        <article className="total">
          <div className="positif">
            <ArrowDown size={20} className="lucid" />
            <span> dépense globales </span>
            <h3> 12 450 € </h3>
          </div>

          <div className="negatif">
            <ArrowUp size={20} className="lucid" />
            <p> mes dépenses</p>
            <h3> 5 165 € </h3>
          </div>
        </article>
      </section>

      <section className="depensesEquilibres">
        <article className="depenses">
          <h5>Dépenses</h5>
          <div>
            <span>Billetterie Stripe</span>
            <span className="positif">+450,00 €</span>
          </div>

          <div>
            <span>Location Salle</span>
            <span className="negatif">-1200,00 €</span>
          </div>

          <div>
            <span>Sponsor TechCorp</span>
            <span className="positif">-1200,00 €</span>
          </div>
        </article>

        <article className="equilibres">
          <h5>Equilibres</h5>
          <div>
            <span>Yoan</span>
            <span className="positif">+450,00 €</span>
          </div>

          <div>
            <span>Bosila</span>
            <span className="negatif">-1200,00 €</span>
          </div>

          <div>
            <span>Michel</span>
            <span className="positif">+1200,00 €</span>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Budget;
