"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// run-ts.ts
var child_process_1 = require("child_process");
var path = require("path");
var fs = require("fs");
// Get the TS file from CLI args
var tsFile = process.argv[2];
if (!tsFile) {
    console.error("❌ Usage: npm run ts <src/file.ts>");
    process.exit(1);
}
// Ensure it exists
if (!fs.existsSync(tsFile)) {
    console.error("\u274C File not found: ".concat(tsFile));
    process.exit(1);
}
// 1. Compile everything
console.log("🔨 Compiling TypeScript...");
(0, child_process_1.execSync)("tsc", { stdio: "inherit" });
// 2. Compute output file path
// Example: src/[folders]/[files].ts → dist/[folders]/[files].js
var relPath = path.relative("src", tsFile);
var jsFile = path.join("dist", relPath).replace(/\.ts$/, ".js");
// 3. Run the compiled JS
console.log("\uD83D\uDE80 Running ".concat(jsFile, "...\n"));
(0, child_process_1.execSync)("node \"".concat(jsFile, "\""), { stdio: "inherit" });
