process.env.NODE_ENV = "test";
require("dotenv").config();
const dbcon = require("../../db_connections");

const {
  getNFTCount,
  getBalance,
  geTopUsers,
  getTotalBalance,
} = require("../../controllers/dashboardController");

describe("Dashboard Controller", () => {
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
  describe("Get NFT Count", () => {
    it("should responce with NFT count", async () => {
      const req = {
        params: { activityType: "bought" },
        data: { usertype: "Super Admin" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await getNFTCount(req, res);
      expect(result.status).toHaveBeenCalledWith(200);
    });
  });
  describe("Get Balance", () => {
    it("should responce with balance", async () => {
      const req = {
        params: { balanceType: "profit" },
        data: { usertype: "Super Admin" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await getBalance(req, res);
      expect(result.status).toHaveBeenCalledWith(200);
    });
  });
  describe("Get Top Users", () => {
    it("should responce with top users", async () => {
      const req = {
        params: { balanceType: "profit" },
        data: { usertype: "Super Admin" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await geTopUsers(req, res);
      expect(result.status).toHaveBeenCalledWith(200);
    });
  });
  describe("Get Total Balance", () => {
    it("should responce with total balance", async () => {
      const req = {
        data: { usertype: "Super Admin" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await getTotalBalance(req, res);
      expect(result.status).toHaveBeenCalledWith(200);
    });
  });
});
