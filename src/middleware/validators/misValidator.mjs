import {body} from "express-validator";

export const cretaeRules = [
    body("mission").isString().withMessage("MISSION MUST BE STRING"),
    body("mission").notEmpty().withMessage("MISSION CAN NOT BE EMPTY"),
];

export const updateMis = [
    body("lastDate").notEmpty().withMessage("DATE REQUIRED"),
];