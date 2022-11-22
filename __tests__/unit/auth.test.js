process.env.NODE_ENV = "test";
require("dotenv").config();
const dbcon = require("../../db_connections");
const uuid = require("uuid");

const { handleConnectWallet } = require("../../controllers/authController");

describe("Auth Controller", () => {
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
  describe("Connect Wallet", () => {
    it("should responce successfully added user", async () => {
      const req = {
        body: {
          walletaddress: { address: uuid.v4() },
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await handleConnectWallet(req, res);
      expect(result.status).toHaveBeenCalledWith(200);
    });
    it("should responce error", async () => {
      const req = {
        body: {
          walletaddress: {},
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await handleConnectWallet(req, res);
      expect(result.status).toHaveBeenCalledWith(500);
    });
  });
});
