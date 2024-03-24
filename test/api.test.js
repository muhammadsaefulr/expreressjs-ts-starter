const request = require("supertest");
const app = require("../app");
const winston = require("winston");

// Buat instance logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

describe("UserController", () => {
  describe("GET /api/users", () => {
    it("should get all users", async () => {
      const res = await request(app)
      .get("/api/users")
      .expect(200);
      logger.info(`Response body: ${JSON.stringify(res.body)}`);
      logger.info(`Response status: ${res.status}`);
    });
  });

  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const newUser = { username: "testuser", email: "test@example.com", password: "examplepass" };
      const res = await request(app)
        .post("/api/users")
        .set("Content-Type", "application/json")
        .send(newUser)
        .expect(201);
      logger.info(`Response body: ${JSON.stringify(res.body)}`);
      logger.info(`Response status: ${res.status}`);
    });
  });
});
