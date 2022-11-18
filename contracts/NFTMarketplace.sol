//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    Counters.Counter private _tokenIds;
    //Keeps track of the number of items sold on the marketplace
    Counters.Counter private _itemsSold;
    //_owner is the address of the deployer of the smart contract
    address payable private _owner;
    //The fee charged by the marketplace to be allowed to list an NFT
    uint256 private _referralRate;

    //The structure to store info about a listed token
    struct Token {
        uint256 tokenId;
        address payable _owner;
        address payable seller;
        uint256 price;
        bool currentlyListed;
    }

    //the event emitted when a token is successfully updated
    event TokenStatusUpdatedSuccess(
        uint256 indexed tokenId,
        address contractAddress,
        address seller,
        uint256 price,
        bool currentlyListed
    );

    //This mapping maps tokenId to token info and is helpful when retrieving details about a tokenId
    mapping(uint256 => Token) private idToToken;

    constructor() ERC721("NFTMarketplace", "NFTM") {
        _owner = payable(msg.sender);
        _referralRate = 1;
    }

    function updateReferralRate(uint256 __referralRate) external onlyOwner {
        _referralRate = __referralRate;
    }

    function getReferralRate() public view returns (uint256) {
        return _referralRate;
    }

    function getSoldItemCount() public view returns (uint256) {
        return _itemsSold.current();
    }

    function getTokenForId(uint256 tokenId) public view returns (Token memory) {
        return idToToken[tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }

    //mint NFT
    function createToken(string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        //Increment the tokenId counter, which is keeping track of the number of minted NFTs
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        //Mint the NFT with newTokenId to the address
        _safeMint(msg.sender, newTokenId);

        //Map the tokenId to the tokenURI (IPFS URL with the NFT metadata)
        _setTokenURI(newTokenId, tokenURI);

        //Update the mapping of tokenId's to Token details, useful for retrieval functions
        idToToken[newTokenId] = Token(
            newTokenId,
            payable(address(this)),
            payable(msg.sender),
            0,
            false
        );

        //Emit the event for successful mint.
        emit TokenStatusUpdatedSuccess(
            newTokenId,
            address(this),
            msg.sender,
            0,
            false
        );

        return newTokenId;
    }

    function ListToken(uint256 tokenId, uint256 price) public payable {
        //Just sanity check
        require(price > 0, "Make sure the price isn't negative");

        //Update the mapping of tokenId's to Token details, useful for retrieval functions
        idToToken[tokenId].price = price;
        idToToken[tokenId].currentlyListed = true;

        _transfer(msg.sender, address(this), tokenId);

        // Emit the event for listing. The frontend parses this message and updates the end user
        emit TokenStatusUpdatedSuccess(
            tokenId,
            address(this),
            address(this),
            price,
            true
        );
    }

    //This will return all the NFTs currently listed to be sold on the marketplace
    function getAllNFTs() public view returns (Token[] memory) {
        uint256 totalNftCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        uint256 currentId;

        //filter out currentlyListed == false
        for (uint256 i = 0; i < totalNftCount; i++) {
            if (idToToken[i + 1].currentlyListed) {
                itemCount += 1;
            }
        }
        Token[] memory tokens = new Token[](itemCount);
        for (uint256 i = 0; i < totalNftCount; i++) {
            currentId = i + 1;
            Token storage currentItem = idToToken[currentId];
            if (currentItem.currentlyListed) {
                tokens[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        //list of all listed NFTs in the marketplace
        return tokens;
    }

    //Returns all the NFTs that the current user is _owner or seller in
    function getMyNFTs() public view returns (Token[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        uint256 currentId;
        //get a count of all the NFTs that belong to the user before we can make an array
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                idToToken[i + 1]._owner == msg.sender ||
                idToToken[i + 1].seller == msg.sender
            ) {
                itemCount += 1;
            }
        }

        //create an array to store all the NFTs of the user
        Token[] memory items = new Token[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                idToToken[i + 1]._owner == msg.sender ||
                idToToken[i + 1].seller == msg.sender
            ) {
                currentId = i + 1;
                Token storage currentItem = idToToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    function transferNFT(uint256 tokenId, address payable receiver)
        public
        payable
    {
        address payable seller = idToToken[tokenId].seller;
        require(seller == msg.sender, "Only Seller can transfer the NFT");

        //update the details of the token
        idToToken[tokenId].currentlyListed = false;
        idToToken[tokenId].seller = receiver;

        //Actually transfer the token to the new owner
        if (ownerOf(tokenId) != seller) {
            _transfer(address(this), receiver, tokenId);
            //approve the marketplace to transfer NFT
            approve(address(this), tokenId);
        } else {
            _transfer(seller, receiver, tokenId);
        }

        emit TokenStatusUpdatedSuccess(
            tokenId,
            address(this),
            payable(receiver),
            0,
            false
        );
    }

    function transferNFTAfterTimeAuction(
        uint256 tokenId,
        address payable receiver, uint256 initialPrice 
    ) public payable {
        address payable seller = idToToken[tokenId].seller;
        require(seller == msg.sender, "Only Seller can transfer the NFT");

        //update the details of the token
        idToToken[tokenId].currentlyListed = false;
        idToToken[tokenId].seller = receiver;

        //Actually transfer the token to the new owner

        _transfer(address(this), receiver, tokenId);
        //approve the marketplace to transfer NFT
        approve(address(this), tokenId);

        seller.transfer(initialPrice);

        emit TokenStatusUpdatedSuccess(
            tokenId,
            address(this),
            receiver,
            0,
            false
        );
    }

    function executeSale(uint256 tokenId) public payable {
        uint256 price = idToToken[tokenId].price;
        address payable seller = idToToken[tokenId].seller;
        require(
            idToToken[tokenId].currentlyListed == true,
            "tokenId is not listed"
        );
        require(
            (price + (price / 100) * _referralRate) <= msg.value,
            "Not sufficient funds for execute sale"
        );

        //update the details of the token
        idToToken[tokenId].currentlyListed = false;
        idToToken[tokenId].seller = payable(msg.sender);
        _itemsSold.increment();

        //Actually transfer the token to the new owner
        _transfer(address(this), payable(msg.sender), tokenId);
        //approve the marketplace to sell NFTs on your behalf
        approve(address(this), tokenId);

        //Transfer the proceeds from the sale to the seller of the NFT
        seller.transfer(price);

        //rest of the price will collect by smart contract

        emit TokenStatusUpdatedSuccess(
            tokenId,
            address(this),
            seller,
            price,
            false
        );
    }

    function chargeForbid(uint256 tokenId, address payable refunder)
        public
        payable
    {
        uint256 price = idToToken[tokenId].price;
        address payable seller = idToToken[tokenId].seller;
        require(
            idToToken[tokenId].currentlyListed == true,
            "tokenId is not listed"
        );
        require(
            price < msg.value,
            "new bidding price should be higher than current bid"
        );
        //update new price (price goes higher with higher biddings)
        idToToken[tokenId].price = msg.value;

        if (refunder != seller) {
            refunder.transfer(price);
        }

        //rest of the msg.value will collect by smart contract

        emit TokenStatusUpdatedSuccess(
            tokenId,
            address(this),
            seller,
            msg.value,
            false
        );
    }

    function withdraw(uint256 amount) public onlyOwner {
        uint balance = address(this).balance;
        require(amount <= balance, "Unsufficient ethers to withdraw");
        payable(msg.sender).transfer(amount);
    }
}
