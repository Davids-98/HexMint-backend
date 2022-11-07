process.env.NODE_ENV = "test";
require("dotenv").config();
const dbcon = require("../../db_connections");
const uuid = require("uuid");

const {
  handleAddAdmin,
  getAdminDetails,
  handleUpdateAdmin,
  getAllAdmins,
} = require("../../controllers/adminController");

describe("Admin Controller", () => {
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
  describe("Add Admin", () => {
    it("should responce already exists admin", async () => {
      const req = {
        body: {
          walletaddress: "0x123955089",
          name: "test",
          email: "test@gmail.com",
          mobile: "1234567890",
          DOB: "2021-01-01",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await handleAddAdmin(req, res);
      expect(result.status).toHaveBeenCalledWith(200);
    });
    it("should responce successfully added admin", async () => {
      const req = {
        body: {
          walletaddress: uuid.v4(),
          name: "test",
          email: "test@gmail.com",
          mobilenumber: "1234567890",
          DOB: "2021-01-01",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await handleAddAdmin(req, res);
      expect(result.status).toHaveBeenCalledWith(201);
    });
    it("should responce error occured", async () => {
      const req = {
        body: {
          name: "test",
          email: "test@gmail.com",
          mobilenumber: "1234567890",
          DOB: "2021-01-01",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await handleAddAdmin(req, res);
      expect(result.status).toHaveBeenCalledWith(500);
    });
  });
  describe("Get Admin Details", () => {
    it("should responce admin details", async () => {
      const req = {
        body: {
          walletaddress: "0x123955089",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await getAdminDetails(req, res);
      expect(result.status).toHaveBeenCalledWith(200);
    });
    it("should responce error occured", async () => {
      const req = {
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await getAdminDetails(req, res);
      expect(result.status).toHaveBeenCalledWith(500);
    });
  });
  describe("Update Admin", () => {
    it("should responce admin updated", async () => {
      const req = {
        body: {
          walletaddress: "0x123955089",
          email: "test2@gmail.com",
          mobilenumber: "1234567890",
          propic: "test-image",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await handleUpdateAdmin(req, res);
      expect(result.status).toHaveBeenCalledWith(200);
    });
    it("should responce no user found", async () => {
      const req = {
        body: {
          walletaddress: "43432534545467",
          email: "test2@gmail.com",
          mobilenumber: "1234567890",
          propic: "test-image",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await handleUpdateAdmin(req, res);
      expect(result.status).toHaveBeenCalledWith(400);
    });
  });
  describe("Get All Admins", () => {
    it("should responce all admins", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const result = await getAllAdmins(req, res);
      expect(result.status).toHaveBeenCalledWith(200);
    }, 40000);
  });
});
