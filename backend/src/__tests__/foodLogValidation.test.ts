import request from "supertest";
import { app } from "../app";

describe("food log validation", () => {
  it("requires authentication before food log access", async () => {
    const response = await request(app).get("/api/foodlogs");
    expect(response.status).toBe(401);
  });
});
