import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

describe("POST api/user/login", () => {
  it("should return a JWT token for valid credentials", (done) => {
    request(app)
      .post("/api/user/login")
      .send({ username: "Shahboz", password: "shahboz2303" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("token");
        done();
      });
  });
});

describe("GET api/user/protected", () => {
  it("should return a protected message for valid token", (done) => {
    request(app)
      .get("/api/user/protected")
      .set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIxMzIwOTI1fQ.1chxbo3tOWMeBhCSr97TgCeNxJ8BuUbGAGELnBL7ed4") // Adjust token
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("message", "This is protected");
        done();
      });
  });
});
