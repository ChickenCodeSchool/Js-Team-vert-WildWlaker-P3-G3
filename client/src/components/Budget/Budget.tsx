import { useEffect, useState } from "react";
import "./Budget.css";

import {
  ArrowDown,
  ArrowUp,
  FilePlusCorner,
  History,
  Pen,
  Plus,
  Trash,
} from "lucide-react";

const apiUrl = import.meta.env.VITE_API_URL;

type Budget = {
  budget_id: number;
  budget_id_event: number;
  budget_id_user: number;
  budget_name: string;
  user_username: string;
  user_name: string;
  budget_price: number;
  budget_creation_date: string;
};

type BudgetByUser = {
  user_id: number;
  user_username: string;
  user_name: string;
  total_price: number;
};

type BudgetTotalEvent = {
  event_id: number;
  event_name: string;
  total_price: number;
};

function getBalancePrice(array: BudgetByUser[]) {
  const result: BudgetByUser[] = [];

  if (array.length === 1) {
    return [
      {
        ...array[0],
        total_price: 0,
      },
    ];
  }

  for (let i = 0; i < array.length; i++) {
    let result_line = array[i].total_price;

    for (let j = 0; j < array.length; j++) {
      if (j !== i) {
        result_line -= array[j].total_price / (array.length - 1);
      }
    }

    const test = {
      user_id: array[i].user_id,
      user_username: array[i].user_username,
      user_name: array[i].user_name,
      total_price: Math.round(result_line * 100) / 100,
    };
    result.push(test);
  }

  return result;
}

function getUserBudget(array: BudgetByUser[], id_user: number) {
  return array.find((user) => user.user_id === id_user);
}

function Budget() {
  const eventID = 1;
  const userID = 5;

  const [budgetEvent, setBudgetEvent] = useState<BudgetTotalEvent>();
  const [listUserBudget, setListUserBudget] = useState<BudgetByUser[]>([]);
  const [listBudget, setListBudget] = useState<Budget[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/budget/event/${eventID}`)
      .then((res) => res.json())
      .then((data: BudgetTotalEvent[]) => setBudgetEvent(data[0]));

    fetch(`${apiUrl}/api/budget/${eventID}/totalUsers`)
      .then((res) => res.json())
      .then((data: BudgetByUser[]) => setListUserBudget(data));

    fetch(`${apiUrl}/api/budget/${eventID}`)
      .then((res) => res.json())
      .then((data: Budget[]) => setListBudget(data));
  }, []);

  const userBudget = getUserBudget(listUserBudget, userID)?.total_price ?? 0;
  const listBalance = getBalancePrice(listUserBudget);
  const userBalance = getUserBudget(listBalance, userID)?.total_price ?? 0;

  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  /* -- Create form -- */

  const [nameCreateForm, setNameCreateForm] = useState<string>("");
  const [priceCreateForm, setPriceCreateForm] = useState<number>();

  /* -- Fonctions -- */

  function addBudget(e: React.FormEvent) {
    e.preventDefault;
    fetch(`${apiUrl}/api/budget/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_event: eventID,
        id_user: userID,
        name: String(nameCreateForm),
        price: Number(priceCreateForm),
      }),
    });
  }

  function updateBudget() {}
  function deleteBudget() {}

  return (
    <div className="budget">
      <header>
        <h1>{budgetEvent?.event_name}</h1>
        <button
          type="button"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          <FilePlusCorner size={20} />
          <span> Ajouter une dépense</span>
        </button>
      </header>

      {showCreateForm ? (
        /* -- Create Form -- */
        <form onSubmit={(e) => addBudget(e)}>
          {/* Name */}
          <input
            type="text"
            placeholder="Le nom du budget"
            onChange={(e) => setNameCreateForm(e.target.value)}
            required
          />

          {/* Name */}
          <input
            type="number"
            placeholder="Le prix du budget"
            onChange={(e) => setPriceCreateForm(Number(e.target.value))}
            required
          />

          <button type="submit">Ajout le budget</button>
        </form>
      ) : (
        ""
      )}

      <section className="myBalance">
        <article className="myBalanceBox">
          {userBalance > 0 && <span>on te doit</span>}
          {userBalance < 0 && <span>tu dois</span>}
          {userBalance === 0 && <span>comptes équilibrés</span>}
          <h2>{userBalance}€</h2>
          <small>
            <History /> last update : yesterday
          </small>
        </article>

        <article className="total">
          <div className="positif">
            <ArrowDown size={20} className="lucid" /> <br />
            <span> dépense globales </span>
            <h3> {budgetEvent?.total_price} € </h3>
          </div>

          <div className="negatif">
            <ArrowUp size={20} className="lucid" /> <br />
            <span> mes dépenses</span>
            <h3> {userBudget} € </h3>
          </div>
        </article>
      </section>

      <section className="expensesAndBalance">
        <div className="expenses">
          <div className="mobileExpenses">
            <h5>Dépenses</h5> <button type="button"> voir plus</button>
          </div>
          <section>
            {listBudget.map((row) => {
              console.log(row);
              return (
                <article key={row.budget_id}>
                  <span>{row.budget_name}</span>
                  <span
                    className={
                      row.budget_id_user !== userID ? "positif" : "negatif"
                    }
                  >
                    {row.budget_id_user !== userID
                      ? `+${row.budget_price}`
                      : `-${row.budget_price}`}
                    €
                    <div
                      className={
                        row.budget_id_user === userID ? "icons" : "Noicons"
                      }
                    >
                      {/* <button type="button" onClick={updateBudget}>*/}
                      <Pen onClick={updateBudget} />
                      {/*</button>*/}
                      {/*<button type="button" onClick={deleteBudget}>*/}
                      <Trash onClick={deleteBudget} />
                      {/*</button>*/}
                    </div>
                  </span>
                </article>
              );
            })}
          </section>
        </div>

        <div className="balance">
          <h5>Equilibres</h5>
          <section>
            {listBalance.map((row) => {
              return (
                <article key={row.user_id}>
                  <span>{row.user_name}</span>
                  <span
                    className={row.total_price >= 0 ? "positif" : "negatif"}
                  >
                    {row.total_price >= 0
                      ? `+${row.total_price}`
                      : `${row.total_price}`}
                    €
                  </span>
                </article>
              );
            })}
          </section>
        </div>
      </section>

      <button type="button" className="addButton">
        <Plus size={20} />
      </button>
    </div>
  );
}

export default Budget;
