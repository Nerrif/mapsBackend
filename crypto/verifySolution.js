const crypto = require("crypto");

function verifySolution(nonce, solution, difficulty) {
  const hash = crypto
    .createHash("sha256")
    .update(nonce + solution)
    .digest("hex");
  return hash.startsWith("0".repeat(difficulty));
}

module.exports = verifySolution;
