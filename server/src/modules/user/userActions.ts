import type { RequestHandler } from "express";
import userRepository from "./userRepository";

// GET /api/users
const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

// GET /api/users/:id
const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);

    const user = await userRepository.read(userId);

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

// POST /api/users
const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    const existingUsername = await userRepository.findByEmailOrUsername(
      newUser.username,
    );

    if (existingUsername) {
      res.status(409).json({
        message: "Ce pseudo existe déjà",
      });
      return;
    }

    const existingEmail = await userRepository.findByEmailOrUsername(
      newUser.email,
    );

    if (existingEmail) {
      res.status(409).json({
        message: "Cet email existe déjà",
      });
      return;
    }

    const insertId = await userRepository.create(newUser);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// POST /api/login
const login: RequestHandler = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    const user = await userRepository.findByEmailOrUsername(identifier);

    if (!user) {
      res.status(401).json({
        message: "Utilisateur introuvable",
      });
      return;
    }

    if (user.user_password !== password) {
      res.status(401).json({
        message: "Mot de passe incorrect",
      });
      return;
    }

    res.status(200).json({
      id: user.user_id,
      username: user.user_username,
      email: user.user_mail,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  read,
  add,
  login,
};
