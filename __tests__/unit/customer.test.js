process.env.NODE_ENV = "test";
require("dotenv").config();
const dbcon = require("../../db_connections");
const uuid = require("uuid");

const {
  updateUserDetails,
  getAllUsers,
  createCollection,
  getAllCollections,
} = require("../../controllers/customerController");

describe("Customer Controller", () => {
  beforeAll(async () => {
    try {
      await dbcon.connect();
    } catch (error) {
      console.log(error);
    }
  });

  afterAll(async () => {
    try {
      await dbcon.close();
    } catch (error) {
      console.log(error);
    }
  });
  describe("Update User Details", () => {
    it("should responce successfully updated user details", async () => {
      const req = {
        body: {
          walletaddress: "0x123955089",
          name: "test",
          username: "test",
          propic: "test",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await updateUserDetails(req, res);
      expect(result.status).toHaveBeenCalledWith(200);
    });
    it("should responce error", async () => {
      const req = {
        body: {
          name: "test",
          username: "test",
          propic: "test",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await updateUserDetails(req, res);
      expect(result.status).toHaveBeenCalledWith(400);
    });
  });
  describe("Get All Users", () => {
    it("should responce successfully get all users", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await getAllUsers(req, res);
      expect(result.status).toHaveBeenCalledWith(200);
    });
  });
  describe("Create Collection", () => {
    it("should responce successfully created collection", async () => {
      const req = {
        body: {
          userid: "0x123456789",
          collectionName: uuid.v4(),
          collectionDescription: "test",
          logoImg: "test",
          ownersCount: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await createCollection(req, res);
      expect(result.status).toHaveBeenCalledWith(202);
    });
    it("should responce already exixts collection", async () => {
      const req = {
        body: {
          userid: "0x123456789",
          collectionName: "test",
          collectionDescription: "test",
          logoImg: "test",
          ownersCount: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await createCollection(req, res);
      expect(result.status).toHaveBeenCalledWith(200);
    });
    it("should responce error invalid input", async () => {
      const req = {
        body: {
          userid: "0x123456789",
          collectionName: 34,
          collectionDescription: "test",
          logoImg: "test",
          ownersCount: "test",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await createCollection(req, res);
      expect(result.status).toHaveBeenCalledWith(500);
    });
    it("should responce error", async () => {
      const req = {
        body: {
          userid: "0x9",
          collectionName: "test",
          collectionDescription: "test",
          logoImg: "test",
          ownersCount: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await createCollection(req, res);
      expect(result.status).toHaveBeenCalledWith(400);
    });
  });
  describe("Get All Collections", () => {
    it("should responce successfully get all collections", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await getAllCollections(req, res);
      expect(result.status).toHaveBeenCalledWith(200);
    });
  });
});
