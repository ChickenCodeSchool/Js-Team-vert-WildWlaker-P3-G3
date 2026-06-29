import type { RequestHandler } from "express";
import adminRepository from "./adminRepository";

const readAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const allUsers = await adminRepository.readAllUser();
    res.json(allUsers);
  } catch (err) {
    next(err);
  }
};

const readAllEvents: RequestHandler = async (req, res, next) => {
  try {
    const allEvents = await adminRepository.readAllEvent();
    res.json(allEvents);
  } catch (err) {
    next(err);
  }
};

const readArrayReport: RequestHandler = async (req, res, next) => {
  try {
    const arrayReport = await adminRepository.readArrayReport();
    res.json(arrayReport);
  } catch (err) {
    next(err);
  }
};

const readArrayUsers: RequestHandler = async (req, res, next) => {
  try {
    const arrayUsers = await adminRepository.readArrayUser();
    res.json(arrayUsers);
  } catch (err) {
    next(err);
  }
};

const readDashboardChart: RequestHandler = async (req, res, next) => {
  try {
    const chartData = await adminRepository.readDashboardChart();
    res.json(chartData);
  } catch (error) {
    next(error);
  }
};

const readReportEvent: RequestHandler = async (req, res, next) => {
  try {
    // const chartData = await adminRepository.readReportEvent();
    const reportEvent = await adminRepository.readReportEvent();
    res.json(reportEvent);
  } catch (error) {
    next(error);
  }
};

const readReportBug: RequestHandler = async (req, res, next) => {
  try {
    // const chartData = await adminRepository.readReportBug();
    const reportBug = await adminRepository.readReportBug();
    res.json(reportBug);
  } catch (error) {
    next(error);
  }
};

const readReportUser: RequestHandler = async (req, res, next) => {
  try {
    // const chartData = await adminRepository.readReportUser();
    const reportUser = await adminRepository.readReportUser();
    res.json(reportUser);
  } catch (error) {
    next(error);
  }
};

//ajouts pour signalements user via admin
const readReportBugById: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const report = await adminRepository.readReportBugById(id);
    if (!report) {
      res.status(404).json({ message: "Signalement introuvable" });
      return;
    }
    res.json(report);
  } catch (err) {
    next(err);
  }
};

const readReportEventById: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const report = await adminRepository.readReportEventById(id);
    if (!report) {
      res.status(404).json({ message: "Signalement introuvable" });
      return;
    }
    res.json(report);
  } catch (err) {
    next(err);
  }
};

const readReportUserById: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const report = await adminRepository.readReportUserById(id);
    if (!report) {
      res.status(404).json({ message: "Signalement introuvable" });
      return;
    }
    res.json(report);
  } catch (err) {
    next(err);
  }
};

const markBugAsDone: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await adminRepository.markBugAsDone(id);
    res.json({ message: "Signalement bug marqué comme traité" });
  } catch (err) {
    next(err);
  }
};

const markEventAsDone: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await adminRepository.markEventAsDone(id);
    res.json({ message: "Signalement event marqué comme traité" });
  } catch (err) {
    next(err);
  }
};

const markUserAsDone: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await adminRepository.markUserAsDone(id);
    res.json({ message: "Signalement user marqué comme traité" });
  } catch (err) {
    next(err);
  }
};

export default {
  readAllUsers,
  readAllEvents,
  readArrayReport,
  readArrayUsers,
  readDashboardChart,
  readReportBug,
  readReportEvent,
  readReportUser,
  readReportBugById,
  readReportEventById,
  readReportUserById,
  markBugAsDone,
  markEventAsDone,
  markUserAsDone,
};
