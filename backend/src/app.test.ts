import { app } from "./app";
import request from "supertest";

describe("GET /user", function () {
  it("requires parameter 'query'", async () => {
    await request(app).get("/companies").expect(400);
  });

  it("returns search results according to search", async () => {
    const response = await request(app).get("/companies?search=zoo").expect("Content-Type", /json/).expect(200);
    expect(JSON.parse(response.text)).toEqual([
      { city: "Nürnberg", name: "Browsezoom", services: ["electrical", "excavation"] },
      { city: "Leipzig", name: "Gigazoom", services: ["excavation", "plumbing"] },
      { city: "Dortmund", name: "Topiczoom", services: ["demolition", "electrical", "plumbing", "sewage"] },
    ]);
  });
});
