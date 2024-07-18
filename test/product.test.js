import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

describe("Product API", () => {
  let token;

  before((done) => {
    request(app)
      .post("/api/user/login")
      .send({ username: "Shahboz", password: "shahboz2303" })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it("should fetch all products", (done) => {
    request(app)
      .get("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("success", true);
        expect(res.body).to.have.property("data").that.is.an("array");
        done();
      });
  });

  it("should create a new product", (done) => {
    request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Product1", price: 100, description: "Description1" })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("success", true);
        expect(res.body).to.have.property("data").that.is.an("object");
        expect(res.body.data).to.have.property("name", "Product1");
        expect(res.body.data).to.have.property("price", 100);
        done();
      });
  });

  it("should update an existing product", (done) => {
    request(app)
      .put("/api/products/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Product1 Updated",
        price: 120,
        description: "Description1 Updated",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("success", true);
        expect(res.body).to.have.property("data").that.is.an("object");
        expect(res.body.data).to.have.property("name", "Product1 Updated");
        expect(res.body.data).to.have.property("price", 120);
        // expect(res.body).to.have.property("message", "Product updated");
        done();
      });
  });
  console.log(token);
  it("should delete a product", (done) => {
    request(app)
      .delete("/api/products/1")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("success", true);
        expect(res.body).to.have.property("message", "Deleted successfully");
        done();
      });
  });
});
