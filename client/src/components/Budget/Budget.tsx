import { useEffect, useState } from "react";
import "./Budget.css";

import {
  ArrowDown,
  ArrowUp,
  FilePlusCorner,
  History,
  Plus,
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
    result[0].total_price = 0;
    return result;
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
  for (let i = 0; i < array.length; i++) {
    if (array[i].user_id === id_user) {
      return array[i];
    }
  }
}

function Budget() {
  const eventID = 1;
  const userID = 5;

  const [listBudget, setListBudget] = useState<Budget[]>([]);
  const [listBudgetUser, setListBudgetUser] = useState<BudgetByUser[]>([]);
  const [budgetUser, setBudgetUser] = useState<BudgetByUser>();
  const [budgetEvent, setBudgetEvent] = useState<BudgetTotalEvent>();

  useEffect(() => {
    fetch(`${apiUrl}/api/budget/${eventID}`)
      .then((res) => res.json())
      .then((data: Budget[]) => setListBudget(data));

    fetch(`${apiUrl}/api/budget/${eventID}/totalUsers`)
      .then((res) => res.json())
      .then((data: BudgetByUser[]) => setListBudgetUser(data));

    fetch(`${apiUrl}/api/budget/user/${eventID}/${userID}`)
      .then((res) => res.json())
      .then((data: BudgetByUser) => setBudgetUser(data));

    fetch(`${apiUrl}/api/budget/event/${eventID}`)
      .then((res) => res.json())
      .then((data: BudgetTotalEvent[]) => setBudgetEvent(data[0]));
  }, []);

  const userBudget = getUserBudget(listBudgetUser, userID);

  console.log(listBudget);
  console.log(listBudgetUser);
  console.log(getBalancePrice(listBudgetUser));
  console.log(budgetUser);
  console.log(budgetEvent);
  console.log(userBudget);

  return (
    <div className="budget">
      <header>
        <h1>{budgetEvent?.event_name}</h1>
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
            <h3> {budgetEvent?.total_price} € </h3>
          </div>

          <div className="negatif">
            <ArrowUp size={20} className="lucid" /> <br />
            <span> mes dépenses</span>
            <h3> {userBudget?.total_price} € </h3>
          </div>
        </article>
      </section>

      <section className="depensesEquilibres">
        <div className="depenses">
          <div className="mobileDepenses">
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
                  </span>
                </article>
              );
            })}
          </section>
        </div>

        <div className="equilibres">
          <h5>Equilibres</h5>
          <section>
            {getBalancePrice(listBudgetUser).map((row) => {
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

      <button type="button" className="plusButton">
        <Plus size={20} />
      </button>
    </div>
  );
}

export default Budget;
