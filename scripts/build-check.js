const fs = require("fs");
const path = require("path");

const required = [
  "index.html",
  "cart.html",
  "checkout.html",
  "about.html",
  "confirmation.html",
  "server.js",
  "shop-data.js",
  "public/images/brand/loading-screen.png",
];

const missing = required.filter((file) => !fs.existsSync(path.join(__dirname, "..", file)));

if (missing.length) {
  console.error(`Missing required files: ${missing.join(", ")}`);
  process.exit(1);
}

console.log("Static build check passed.");
