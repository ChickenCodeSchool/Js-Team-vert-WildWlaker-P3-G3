import type { RequestHandler } from "express";

import todoRepository from "./todoRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.eventId);
    const todo = await todoRepository.readAll(eventId);

    res.json(todo);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newTodo = {
      todo_id_event: req.body.todo_id_event,
      todo_id_user: req.body.todo_id_user,
      todo_name: req.body.todo_name,
      todo_deadline: req.body.todo_deadline,
      todo_is_done: req.body.todo_is_done,
    };

    const insertId = await todoRepository.create(newTodo);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const editTodo = {
      todo_id: Number(req.params.todo_id),
      todo_name: req.body.todo_name,
      todo_is_done: req.body.todo_is_done,
    };

    const resultAffectedRows = await todoRepository.update(editTodo);

    res.status(200).json({ resultAffectedRows });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const resultAffectedRows = await todoRepository.delete(
      Number(req.params.todo_id),
    );

    res.status(200).json({ resultAffectedRows });
  } catch (err) {
    next(err);
  }
};

export default { browse, edit, add, destroy };
