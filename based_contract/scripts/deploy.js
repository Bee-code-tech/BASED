const hre = require("hardhat");
const ethers = require("ethers");
const CommunityModule = require("../ignition/modules/Community");
const PostModule = require("../ignition/modules/Post");
const ProjectModule = require("../ignition/modules/Project");
const UserProfileModule = require("../ignition/modules/UserProfile");
const PaymentModule = require("../ignition/modules/PaymentToken");

async function main() {
  const comm = await hre.ignition.deploy(CommunityModule);
  const proj = await hre.ignition.deploy(ProjectModule);
  const post = await hre.ignition.deploy(PostModule);
  const user = await hre.ignition.deploy(UserProfileModule);

  console.log("Done deploying the Libraries");

  const pay = await hre.ignition.deploy(PaymentModule);

  console.log("Done deploying the PaymentToken Contracts: ", pay.payment.target);

  const contractFactory = await hre.ethers.getContractFactory("Based", {
    libraries: {
      CommunityLib: comm.community.target,
      ProjectLib: proj.project.target,
      UserProfileLib: user.userProfile.target,
      PostLib: post.post.target,
    },
  });

  console.log("Done linking the Libraries");

  const owner = "0xF2E7E2f51D7C9eEa9B0313C2eCa12f8e43bd1855";

  const res = await contractFactory.deploy(owner, pay.payment.target);

  console.log("Based contract deployed to: ", res.target);
}

main().catch(console.error);