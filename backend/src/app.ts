import express from "express";
import { query, validationResult } from "express-validator";
import cors from "cors";
import companies from "./companies.json";

export const app = express();
app.use(cors());

app.get("/companies", query("search").isLength({ min: 3 }), query("services").optional().toArray(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { search, services } = req.query! as { search: string; services?: string[] };
  const regexp = new RegExp(search);
  let filtered = companies.filter((company) => regexp.test(company.name));
  if (services && services.length > 0) {
    filtered = filtered.filter((company) => company.services.some((service) => services.includes(service)));
  }

  res.json(filtered);
});
