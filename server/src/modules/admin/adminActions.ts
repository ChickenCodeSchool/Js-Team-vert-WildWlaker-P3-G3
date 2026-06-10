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
    const chartData = await adminRepository.readReportEvent();

    res.json(chartData);
  } catch (error) {
    next(error);
  }
};
const readReportBug: RequestHandler = async (req, res, next) => {
  try {
    const chartData = await adminRepository.readReportBug();

    res.json(chartData);
  } catch (error) {
    next(error);
  }
};
const readReportUser: RequestHandler = async (req, res, next) => {
  try {
    const chartData = await adminRepository.readReportUser();

    res.json(chartData);
  } catch (error) {
    next(error);
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
};
