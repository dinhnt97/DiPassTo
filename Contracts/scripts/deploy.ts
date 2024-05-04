import { ethers } from "hardhat";

async function main() {
  // Deploy ERC721Pool
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy("ERC20", "ERC20");
  await token.deployed();
  console.log("Token deployed to:", token.address);

  // Deploy Wheel
  const Wheel = await ethers.getContractFactory("Wheel");
  const wheel = await Wheel.deploy(token.address);
  await wheel.deployed();
  console.log("Wheel deployed to:", wheel.address);

  // Approve Wheel to spend ERC20
  await token.approve(wheel.address, "2000000000000000000000");

  // Deploy Pool
  let tx = await wheel.createPool(
    "2000000000000000000000",
    5,
    1714830032,
    1728047142,
    [5, 10, 30, 55],
    [50, 30, 15, 5]
  );

  console.log("Pool deployed to:", await wheel.pools(0));

  // Attach Pool
  const Pool = await ethers.getContractFactory("Pool");
  const pool = Pool.attach(await wheel.pools(0));

  // // Get Pool Info
  console.log("Pool Info:", await pool.poolAmount());

  // Approve token to pool
  await token.approve(pool.address, "2000000000000000000000");

  // Register to pool
  await pool.register();
  // Roll
  tx = await pool.roll(0);
  await tx.wait();
  console.log("tx", tx);

  // // Register again
  // await pool.register();
  // // Roll
  // await pool.roll(1);
  // console.log("Pool Info:", await pool.poolAmount());

  // // Register again
  // await pool.register();
  // // Roll
  // let rollTx = await pool.roll(2);
  // await rollTx.wait();
  // console.log("Pool Info:", await pool.poolAmount());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
