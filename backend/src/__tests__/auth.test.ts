import request from "supertest";
import { app } from "../app";
import { prisma } from "../config/prisma";

jest.mock("../config/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn()
    }
  }
}));

describe("auth routes", () => {
  it("rejects invalid register payloads", async () => {
    const response = await request(app).post("/api/auth/register").send({ email: "bad" });
    expect(response.status).toBe(422);
  });

  it("registers a new user", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.user.create as jest.Mock).mockResolvedValue({
      id: "2f7f9efe-8185-4d4c-91ce-447bb57bfad8",
      name: "Asha",
      email: "asha@example.com",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const response = await request(app).post("/api/auth/register").send({
      name: "Asha",
      email: "asha@example.com",
      password: "Password123!"
    });

    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
  });
});
