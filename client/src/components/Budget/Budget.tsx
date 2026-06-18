import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Budget.css";

import {
  ArrowDown,
  ArrowUp,
  Check,
  FilePlusCorner,
  History,
  Pen,
  Plus,
  Trash,
  X,
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

function returnDateString(dateString: string) {
  const date = new Date(dateString);
  const targetDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffDays = Math.round(
    (today.getTime() - targetDay.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays <= 0) return "aujourd’hui";
  if (diffDays === 1) return "hier";
  if (diffDays === 2) return "avant-hier";
  if (diffDays <= 7) return `il y a ${diffDays} jours`;

  return date.toLocaleDateString("fr-FR");
}

function Budget() {
  const { id } = useParams();
  const eventID = Number(id);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userID = user?.id;

  const [budgetEvent, setBudgetEvent] = useState<BudgetTotalEvent>();
  const [listUserBudget, setListUserBudget] = useState<BudgetByUser[]>([]);
  const [listBudget, setListBudget] = useState<Budget[]>([]);

  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  /* -- Create form -- */

  const [nameCreateForm, setNameCreateForm] = useState<string>("");
  const [priceCreateForm, setPriceCreateForm] = useState<number>();

  /* -- Update form -- */

  const [budgetUpdate, setBudgetUpdate] = useState<Budget | null>(null);
  const [nameUpdateForm, setNameUpdateForm] = useState<string>("");
  const [priceUpdateForm, setPriceUpdateForm] = useState<number>();

  /* -- Delete Confirmaton -- */

  const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(
    null,
  );

  useEffect(() => {
    fetchBudgetLists();
  }, []);

  const userBudget = getUserBudget(listUserBudget, userID)?.total_price ?? 0;
  const listBalance = getBalancePrice(listUserBudget);
  const userBalance = getUserBudget(listBalance, userID)?.total_price ?? 0;

  /* -- Fonctions -- */

  function fetchBudgetLists() {
    fetch(`${apiUrl}/api/budget/event/${eventID}`)
      .then((res) => res.json())
      .then((data: BudgetTotalEvent[]) => setBudgetEvent(data[0]));
    fetch(`${apiUrl}/api/budget/${eventID}/totalUsers`)
      .then((res) => res.json())
      .then((data: BudgetByUser[]) => setListUserBudget(data));

    fetch(`${apiUrl}/api/budget/${eventID}`)
      .then((res) => res.json())
      .then((data: Budget[]) => setListBudget(data));
  }

  async function addBudget(e: React.FormEvent) {
    e.preventDefault();

    if (!nameCreateForm.trim()) {
      alert("❌ Erreur : Nom obligatoire");
      return;
    }

    if (
      priceCreateForm === undefined ||
      Number.isNaN(priceCreateForm) ||
      priceCreateForm === 0
    ) {
      alert("❌ Erreur : Prix invalide");
      return;
    }

    if (priceCreateForm < 0) {
      alert("❌ Erreur : Prix ne peux pas être négatif");
      return;
    }

    const answer = await fetch(`${apiUrl}/api/budget/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_event: eventID,
        id_user: userID,
        name: String(nameCreateForm),
        price: Number(priceCreateForm),
      }),
    });

    await fetchBudgetLists();

    setNameCreateForm("");
    setPriceCreateForm(undefined);
    setShowCreateForm(false);

    const data = await answer.json();

    alert(
      answer.ok
        ? "✅ Succès : Budget ajouter avec succès"
        : `❌ Erreur : ${answer.status} - ${JSON.stringify(data)}`,
    );
  }

  function openUpdateForm(budget: Budget) {
    setBudgetUpdate(budget);

    setNameUpdateForm(budget.budget_name);
    setPriceUpdateForm(budget.budget_price);
  }

  async function updateBudget(e: React.FormEvent) {
    e.preventDefault();

    if (!nameUpdateForm.trim()) {
      alert("❌ Erreur : Nom obligatoire");
      return;
    }

    if (
      priceUpdateForm === undefined ||
      Number.isNaN(priceUpdateForm) ||
      priceUpdateForm === 0
    ) {
      alert("❌ Erreur : Prix invalide");
      return;
    }

    if (priceUpdateForm < 0) {
      alert("❌ Erreur : Prix ne peux pas être négatif");
      return;
    }

    if (budgetUpdate === null) return;

    if (
      nameUpdateForm === budgetUpdate.budget_name &&
      Number(priceUpdateForm) === Number(budgetUpdate.budget_price)
    ) {
      alert("⚠️ Aucune modification n’a été détectée");
      return;
    }

    const answer = await fetch(`${apiUrl}/api/budget/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_budget: budgetUpdate.budget_id,
        name: nameUpdateForm,
        price: priceUpdateForm,
      }),
    });

    await fetchBudgetLists();

    setNameUpdateForm("");
    setPriceUpdateForm(undefined);

    const data = await answer.json();

    alert(
      answer.ok
        ? "✅ Succès : Budget mis à jour avec succès"
        : `❌ Erreur : ${answer.status} - ${JSON.stringify(data)}`,
    );
  }

  async function deleteBudget(e: React.FormEvent, id: number) {
    e.preventDefault();

    await fetch(`${apiUrl}/api/budget/${id}`, {
      method: "DELETE",
    });

    await fetchBudgetLists();
  }

  return (
    <div className="budget">
      <div className="budgetHeader">
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
      </div>
      <div className="budgetBody">
        {showCreateForm ? (
          /* -- Create Form -- */
          <div className="form">
            <form className="createForm" onSubmit={(e) => addBudget(e)}>
              <div className="mobileOnly">
                <h5>Ajoute un budget</h5>
                <X className="icons" onClick={() => setShowCreateForm(false)} />
              </div>

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

              <button type="submit">Ajouter</button>
            </form>
          </div>
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
              <History /> last update :{" "}
              {returnDateString(
                listBudget[listBudget.length - 1]?.budget_creation_date,
              )}
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
              <h5>Dépenses</h5>
            </div>
            <section>
              {listBudget.map((row) => {
                return (
                  <article key={row.budget_id}>
                    {budgetUpdate?.budget_id === row.budget_id ? (
                      <>
                        <input
                          type="text"
                          value={nameUpdateForm}
                          onChange={(e) => setNameUpdateForm(e.target.value)}
                        />
                        <input
                          type="number"
                          value={priceUpdateForm}
                          onChange={(e) =>
                            setPriceUpdateForm(Number(e.target.value))
                          }
                        />

                        <Check
                          className={`icons positif ${nameUpdateForm === budgetUpdate.budget_name && Number(priceUpdateForm) === Number(budgetUpdate.budget_price) ? "disabled" : ""}`}
                          onClick={(e) => {
                            if (
                              !(
                                nameUpdateForm === budgetUpdate.budget_name &&
                                Number(priceUpdateForm) ===
                                  Number(budgetUpdate.budget_price)
                              )
                            ) {
                              updateBudget(e);
                              setBudgetUpdate(null);
                            }
                          }}
                        />
                        <X
                          className="icons negatif"
                          onClick={() => {
                            setBudgetUpdate(null);
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <span>{row.budget_name}</span>
                        <span
                          className={
                            row.budget_id_user !== userID
                              ? "price positif"
                              : "price negatif"
                          }
                        >
                          {row.budget_id_user !== userID
                            ? `+${row.budget_price}`
                            : `-${row.budget_price}`}
                          €
                          <div
                            className={
                              row.budget_id_user === userID
                                ? "icons"
                                : "Noicons"
                            }
                          >
                            {deleteConfirmation === row.budget_id ? (
                              <>
                                <Check
                                  className="positif"
                                  onClick={(e) =>
                                    deleteBudget(e, row.budget_id)
                                  }
                                />
                                <X
                                  className="negatif"
                                  onClick={() => setDeleteConfirmation(null)}
                                />
                              </>
                            ) : (
                              <>
                                <Pen onClick={() => openUpdateForm(row)} />
                                <Trash
                                  onClick={() =>
                                    setDeleteConfirmation(row.budget_id)
                                  }
                                />
                              </>
                            )}
                          </div>
                        </span>
                      </>
                    )}
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

        <button
          type="button"
          className="addButton"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}

export default Budget;
