const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");
const KycContract = artifacts.require("KycContract");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("TokenSale", async function(accounts) {
    const [ initialHolder, recipient, anotherAccount ] = accounts;

//the rest of the code here

it("should be possible to buy one token by simply sending ether to the smart contract", async () => {
    let tokenInstance = await Token.deployed();
    let tokenSaleInstance = await TokenSale.deployed();
    let balanceBeforeAccount = await tokenInstance.balanceOf.call(recipient);
    await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.rejected;
    await expect(balanceBeforeAccount).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));

    let kycInstance = await KycContract.deployed();
    await kycInstance.setKycCompleted(recipient);
    await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
    return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));

});


});