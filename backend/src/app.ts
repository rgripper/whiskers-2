import express from "express";
import { query, validationResult } from "express-validator";
import companies from "./companies.json";

export const app = express();

app.get("/companies", query("search").isLength({ min: 3 }), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const regexp = new RegExp(req.query!.search);

  res.json(companies.filter((x) => regexp.test(x.name)));
});
