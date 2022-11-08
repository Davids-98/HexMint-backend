process.env.NODE_ENV = "test";
require("dotenv").config();
const dbcon = require("../../db_connections");
const uuid = require("uuid");

const {
  getUserDetailsFromWalletAddress,
  getUserType,
} = require("../../controllers/userController");

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
  describe("Get User Details", () => {
    it("should responce successfully get user details", async () => {
      const req = {
        query: {
          walletAddress: "0x123955089",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await getUserDetailsFromWalletAddress(req, res);
      expect(result.status).toHaveBeenCalledWith(200);
    });
    it("should responce error", async () => {
      const req = {
        query: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await getUserDetailsFromWalletAddress(req, res);
      expect(result.status).toHaveBeenCalledWith(400);
    });
  });
  describe("Get User Type", () => {
    it("should responce successfully get user type", async () => {
      const req = {
        query: {
          walletAddress: "0x123955089",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await getUserType(req, res);
      expect(result.status).toHaveBeenCalledWith(200);
    });

    it("should responce error", async () => {
      const req = {
        query: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await getUserType(req, res);
      expect(result.status).toHaveBeenCalledWith(400);
    });
  });
});
