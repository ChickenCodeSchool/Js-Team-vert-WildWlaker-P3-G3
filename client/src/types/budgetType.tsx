export type budgetType = {
  id: number;

  name: string;
  price: number;
  creation_date: string;

  id_event: number;
  id_user: number;
};

export type budgetTypeArray = budgetType[];
