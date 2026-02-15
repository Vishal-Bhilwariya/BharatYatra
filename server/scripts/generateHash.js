const bcrypt = require("bcrypt");

const password = "V@ishVish@love";

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("\n✅ Password Hash Generated:\n");
    console.log(hash);
    console.log("\n📋 MongoDB Document:\n");
    console.log(JSON.stringify({
      username: "admin",
      password: hash,
      isActive: true
    }, null, 2));
  }
  process.exit(0);
});
