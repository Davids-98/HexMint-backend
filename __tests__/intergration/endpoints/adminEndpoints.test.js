process.env.NODE_ENV = "test";

const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../../app");
const conn = require("../../../db_connections");

require("dotenv").config();

const uuid = require("uuid");

describe("Admin endpoints", () => {
  beforeAll(async () => {
    // connect to mongodb and listen

    try {
      await conn.connect();
    } catch (err) {
      console.log(err);
    }
  });

  afterAll(async () => {
    // close DB connection

    try {
      await conn.close();
    } catch (err) {
      console.log(err);
    }
  });

  describe("/admin/add-admin - save anew admin to database", () => {
    it("should return response to already exists admin", async () => {
      const res = await request(app).post("/admin/add-admin").send({
        name: "test",
        walletaddress: "0x1234567800",
        email: "test@email.com",
        mobilenumber: "1234567890",
        DOB: "1999-01-01",
      });
      expect(res.statusCode).to.equal(200);
    });
    it("should return response to newly added admin", async () => {
      const res = await request(app).post("/admin/add-admin").send({
        name: "test",
        walletaddress: uuid.v4(),
        email: "test@email.com",
        mobilenumber: "1234567890",
        DOB: "1999-01-01",
      });
      expect(res.statusCode).to.equal(201);
    });
    it("should return response to invalid data", async () => {
      const res = await request(app).post("/admin/add-admin").send({
        name: "test",
        email: "test@email.com",
        mobilenumber: "1234567890",
        DOB: "1999-01-01",
      });
      expect(res.statusCode).to.equal(500);
    });
  }, 40000);
  describe("/admin/update-admin-details - update admin details", () => {
    it("should return response to updated admin", async () => {
      const res = await request(app).post("/admin/update-admin-details").send({
        walletaddress: "0x1234567800",
        email: "test@mail.com",
        mobilenumber: "1234567890",
        propic: "test.jpg",
      });
      expect(res.statusCode).to.equal(200);
    });
    it("should return response to not exist admin", async () => {
      const res = await request(app).post("/admin/update-admin-details").send({
        walletaddress: "0x1800",
        email: "test@mail.com",
        mobilenumber: "1234567890",
        propic: "test.jpg",
      });
      expect(res.statusCode).to.equal(400);
    });
  });
  describe("/admin/get-admin-details - get admin details", () => {
    it("should return response to get admin details", async () => {
      const res = await request(app).get("/admin/get-admin-details").send({
        walletaddress: "0x1234567800",
      });
      expect(res.statusCode).to.equal(200);
    });
    it("should return response to invalid data", async () => {
      const res = await request(app).get("/admin/get-admin-details").send({});
      expect(res.statusCode).to.equal(500);
    });
  });
  describe("/admin/get-all-admins - get all admins", () => {
    it("should return response to get all admins", async () => {
      const res = await request(app).get("/admin/get-all-admins").send({});
      expect(res.statusCode).to.equal(200);
    }, 40000);
  });
});
