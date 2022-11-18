const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Hexmint NFT Marketplace", function () {
  let Hexmint, contract, owner, addr1, addr2, addr3, addrs;
  beforeEach(async function () {
    Hexmint = await ethers.getContractFactory("NFTMarketplace");
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
    contract = await Hexmint.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await contract.owner()).to.equal(owner.address);
    });
  });

  describe("update list price", function () {
    it("it should be contract address calling", async function () {
      const _newListPrice = ethers.utils.parseUnits("0.001", "ether");
      await expect(
        contract.connect(addr1).updateListPrice(_newListPrice)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should set new list price", async function () {
      const _newListPrice = ethers.utils.parseEther("0.01");
      const response = await contract
        .connect(owner)
        .updateListPrice(_newListPrice);
      await response.wait();
      expect(await contract.getListPrice()).to.equal(_newListPrice);
    });
  });

  describe("get list price", function () {
    it("should get list price", async function () {
      const _newListPrice = ethers.utils.parseEther("0.001");
      const response = await contract
        .connect(owner)
        .updateListPrice(_newListPrice);
      await response.wait();
      expect(await contract.getListPrice()).to.equal(_newListPrice);
    });
  });

  describe("get sold item count", function () {
    it("should get sold items count", async function () {
      const prev_count = await contract.getSoldItemCount();
      const response = await contract
        .connect(owner)
        .createToken("metadata url");
      await response.wait();
      //implement
      const price = ethers.utils.parseEther("0.01");
      const value = ethers.utils.parseEther("0.01");
      const response1 = await contract
        .connect(owner)
        .ListToken(newTokenId, price);
      const response2 = contract
        .connect(addr1)
        .executeSale(newTokenId, { value: providedValue });
      await response2.wait();
      expect("").to.equal(parseInt(prev_count) + 1);
    });
  });

  describe("get token object for tokenId", function () {
    it("return token", async function () {
      //change owner to other signer(signers getting undefined for now)
      const prev_tokenId = await contract.getCurrentToken();
      const response1 = await contract
        .connect(owner)
        .createToken("metadata url");
      await response1.wait();
      const response2 = await contract.getTokenForId(
        parseInt(prev_tokenId) + 1
      );
      expect(response2.tokenId).to.equal(parseInt(prev_tokenId) + 1);
    });
  });

  describe("get current token", function () {
    it("return tokenid", async function () {
      const prev_tokenId = await contract.getCurrentToken();
      const response1 = await contract
        .connect(owner)
        .createToken("metadata url");
      await response1.wait();
      const response2 = await contract.getCurrentToken();
      await response2.wait();
      expect(response2).to.equal(parseInt(prev_tokenId) + 1);
    });
  });

  describe("create(mint) token", function () {
    it("token id should increment", async function () {
      const prev_tokenId = await contract.getCurrentToken();
      const response = await contract
        .connect(owner)
        .createToken("metadata url");
      await response.wait();
      console.log("response: ", response);
      expect(await contract.getCurrentToken()).to.equal(
        parseInt(prev_tokenId) + 1
      );
    });

    it("get token for new token id", async function () {
      //change owner to other signer(signers getting undefined for now)
      const prev_tokenId = await contract.getCurrentToken();
      const response1 = await contract
        .connect(owner)
        .createToken("metadata url");
      await response1.wait();
      const response2 = await contract.getTokenForId(
        parseInt(prev_tokenId) + 1
      );
      expect(response2.tokenId).to.equal(parseInt(prev_tokenId) + 1);
    });

    it("event emit", async function () {
      await expect(contract.createToken("metadata url")).to.emit(
        contract,
        "TokenStatusUpdatedSuccess"
      );
    });

    it("return new tokenid", async function () {
      const prev_tokenId = await contract.getCurrentToken();
      expect(
        await contract.connect(owner).callStatic.createToken("metadata url")
      ).to.equal(parseInt(prev_tokenId) + 1);
    });
  });

  describe("list minted token", function () {
    it("price should be positive", async function () {
      const newTokenId = await contract
      .connect(owner)
      .callStatic.createToken("metadata url");
      const price = ethers.utils.parseEther("0");
      await expect(
        contract.ListToken(newTokenId, price)
      ).to.be.revertedWith("Make sure the price isn't negative");
    });
    it("price get updated", async function () {
      const newTokenId = await contract
        .connect(owner).callStatic
        .createToken("metadata url");
      const price = ethers.utils.parseEther("0.01");
      const response = await contract
        .connect(owner)
        .ListToken(newTokenId, price);
      await response.wait();
      const response1 = await getTokenForId(newTokenId);
      await response1.wait();
      expect(response1.price).to.equal(price);
    });

    it("token get listed", async function () {
      const newTokenId = await contract
        .connect(owner).callStatic
        .createToken("metadata url");
      const price = ethers.utils.parseEther("0.001");
      const response = await contract.ListToken(newTokenId, price);
      await response.wait();
      const response1 = await getTokenForId(newTokenId);
      await response1.wait();
      expect(response1.currentlyListed).to.equal(true);
    });

    it("ownership of token should be changed", async function () {
      const newTokenId = await contract
        .connect(owner).callStatic
        .createToken("metadata url");
      const price = ethers.utils.parseEther("0.001");
      const response = await contract
        .connect(owner)
        .ListToken(newTokenId, price);
      await response.wait();
      const response2 = await contract.getTokenOwner(newTokenId);
      await response2.wait();
      expect(response2).to.equal(contract.address);
    });
  });

  describe.only("get all nfts", function () {
    it("listed token count match the length of array", async function () {
      const prevArray = await contract.getAllNFTs();
      const price = ethers.utils.parseEther("0.001");
      const response = await contract
        .connect(owner)
        .ListToken(newTokenId, price);
      await response.wait();
      const newArray = await contract.getAllNFTs();
      expect(newArray.length).to.equal(prevArray.length + 1);
    });
  });

  describe("get my nfts", function () {
    it("listed token count by one address match the length of array", async function () {
      const newTokenId = await contract
        .connect(addr1).callStatic
        .createToken("metadata url");
      const prevArray = await contract.connect(addr1).getMyNFTs();
      const price = ethers.utils.parseEther("0.001");
      const response = await contract
        .connect(addr1)
        .ListToken(newTokenId, price);
      await response.wait();
      const newArray = await contract.connect(owner).getMyNFTs();
      expect(newArray.length).to.equal(prevArray.length + 1);
    });
  });

  describe("transfer nft", async function () {
    const newTokenId = await contract
      .connect(owner)
      .callStatic.createToken("metadata url");
    console.log("new token: ", newTokenId);

    it("only seller can transfer", async function () {
      await expect(
        contract.connect(addr1).transferNFT(newTokenId, addr2.address)
      ).to.be.revertedWith("Only Seller can transfer the NFT");
    });

    it("customer should have enough funds", async function () {
      // const newTokenId = await contract.callStatic.createToken("metadata url");
      const price = ethers.utils.parseEther("0.001");
      const value = ethers.utils.parseEther("0.01");
      //signer with no money required
      await expect(
        contract.transferNFT(newTokenId, addr1.address)
      ).to.be.revertedWith("Not sufficient funds for execute sale");
    });
    it("token state changes to unlisted", async function () {
      const price = ethers.utils.parseEther("0.001");
      const value = ethers.utils.parseEther("0.01");
      const response = await contract.ListToken(newTokenId, price);
      await response.wait();
      const response1 = await contract
        .connect(owner)
        .transferNFT(newTokenId, addr1.address);
      await response1.wait();
      const response2 = await contract.getTokenForId(newTokenId);
      await response2.wait();
      expect(response2.currentlyListed).to.equal(false);
    });

    it("owner get changed", async function () {
      const response1 = await contract
        .connect(owner)
        .transferNFT(newTokenId, addr1.address);
      await response1.wait();
      const response2 = await contract.getTokenForId(newTokenId);
      await response2.wait();
      expect(response2.seller).to.equal(addr1.address);
    });
  });

  describe("execute sale", async function () {
    const newTokenId = await contract
      .connect(owner)
      .callStatic.createToken("metadata url");
    it("tokenID should be listed", async function () {
      // const newTokenId = await contract
      //   .connect(owner)
      //   .callStatic.createToken("metadata url");
      await expect(contract.executeSale(newTokenId)).to.be.revertedWith(
        "tokenId is not listed"
      );
    });

    it("customer should have enough funds", async function () {
      // const newTokenId = await contract.callStatic.createToken("metadata url");
      const price = ethers.utils.parseEther("0.001");
      const value = ethers.utils.parseEther("0.01");
      const response = await contract.ListToken(newTokenId, price);
      //signer with no money required
      expect(contract.executeSale(newTokenId)).to.be.revertedWith(
        "Not sufficient funds for execute sale"
      );
    });
    it("passed value equal to the price", async function () {
      // const newTokenId = await contract.callStatic.createToken("metadata url");
      const price = ethers.utils.parseEther("0.001");
      const value = ethers.utils.parseEther("0.01");
      const providedValue = ethers.utils.parseEther("0.005");
      const response = await contract.ListToken(newTokenId, price);
      await response.wait();
      await expect(
        contract.executeSale(newTokenId, { value: providedValue })
      ).to.be.revertedWith(
        "Please submit the asking price in order to complete the purchase"
      );
    });

    it("token get unlisted", async function () {
      const price = ethers.utils.parseEther("0.001");
      const value = ethers.utils.parseEther("0.01");
      const providedValue = ethers.utils.parseEther("0.001");
      const response = await contract.ListToken(newTokenId, price);
      await response.wait();
      const response1 = contract
        .connect(addr1)
        .executeSale(newTokenId, { value: providedValue });
      await response1.wait();
      const response2 = await contract.getTokenForId(newTokenId);
      await response2.wait();
      expect(response2.currentlyListed).to.equal(false);
    });
    it("seller get changed", async function () {
      const price = ethers.utils.parseEther("0.001");
      const value = ethers.utils.parseEther("0.01");
      const providedValue = ethers.utils.parseEther("0.001");
      const response = await contract.ListToken(newTokenId, price);
      await response.wait();
      const response1 = contract
        .connect(addr1)
        .executeSale(newTokenId, { value: providedValue });
      await response1.wait();
      const response2 = await contract.getTokenForId(newTokenId);
      await response2.wait();
      expect(response2.seller).to.equal(addr1.address);
    });

    it("sold count get incremented", async function () {
      const prevSoldCount = await contract.getSoldItemCount();
      await prevSoldCount.wait();
      const price = ethers.utils.parseEther("0.001");
      const value = ethers.utils.parseEther("0.01");
      const providedValue = ethers.utils.parseEther("0.001");
      const response = await contract.ListToken(newTokenId, price);
      await response.wait();
      const response1 = contract
        .connect(addr1)
        .executeSale(newTokenId, { value: providedValue });
      await response1.wait();
      const response2 = await contract.getSoldItemCount();
      await response2.wait();
      expect(response2).to.equal(parseInt(prevSoldCount) + 1);
    });
  });

  describe("withdraw money", function () {
    it("Only owner can withdraw money", async function () {
      await expect(contract.connect(addr1).withdraw()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("owners' balance get updated", async function () {
      const newTokenId = await contract
        .connect(owner)
        .callStatic.createToken("metadata url");
      const price = ethers.utils.parseEther("0.001");
      const value = ethers.utils.parseEther("0.01");

      const response = await contract.ListToken(newTokenId, price);
      await response.wait();
      const accountBalanceBeforeWithdraw = ethers.utils.formatEther(
        await contract.provider.getBalance(owner.address)
      );

      await contract.connect(owner).withdraw();
      const accountBalanceAfterWithdraw = ethers.utils.formatEther(
        await contract.provider.getBalance(owner.address)
      );

      expect(
        parseInt(accountBalanceAfterWithdraw) >
          parseInt(accountBalanceBeforeWithdraw)
      ).to.be.true;
    });
  });
});
