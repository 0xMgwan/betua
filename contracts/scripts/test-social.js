const hre = require("hardhat");

async function main() {
  // Contract address from our deployment
  const contractAddress = "0x8fD222cd4E8eeBB2d1357A62DBF9aC753A83AE25";
  
  // Get the contract instance
  const AfricaBet = await hre.ethers.getContractFactory("AfricaBet");
  const africaBet = await AfricaBet.attach(contractAddress);

  // Get the signer
  const [signer] = await hre.ethers.getSigners();
  console.log("Testing with account:", signer.address);

  try {
    // Create a test event
    console.log("\nCreating a test event...");
    const startTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    const endTime = startTime + 7200; // 2 hours after start
    const tx1 = await africaBet.createEvent(
      "World Cup 2026",
      startTime,
      endTime
    );
    await tx1.wait();
    console.log("Event created successfully!");

    // Add a comment to the event
    console.log("\nAdding a comment to the event...");
    const tx2 = await africaBet.addComment(1, "This is going to be an exciting match!", true);
    await tx2.wait();
    console.log("Comment added successfully!");

    // Get comment details
    console.log("\nFetching comment details...");
    const comment = await africaBet.getCommentDetails(1);
    console.log("Comment:", {
      commenter: comment.commenter,
      content: comment.content
    });

    // Get user profile
    console.log("\nFetching user profile...");
    const profile = await africaBet.getUserProfile(signer.address);
    console.log("User Profile:", {
      reputation: profile.reputation.toString(),
      totalLikesReceived: profile.totalLikesReceived.toString(),
      totalCommentsPosted: profile.totalCommentsPosted.toString()
    });

  } catch (error) {
    console.error("Error:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
