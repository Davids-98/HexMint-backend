process.env.NODE_ENV = "test";
require("dotenv").config();
const dbcon = require("../../db_connections");
const uuid = require("uuid");

const {
  getUserDetailsFromWalletAddress,
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
  describe("Get User Details from walletaddress", () => {
    it("should responce successfully get user details", async () => {
      const req = {
        query: {
          walletAddress: "0x123955089",
        },
        data: { usertype: "Customer" },
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
        data: { usertype: "Customer" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await getUserDetailsFromWalletAddress(req, res);
      expect(result.status).toHaveBeenCalledWith(400);
    });
  });
});
