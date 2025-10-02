// run-ts.ts
import { execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";

// Get the TS file from CLI args
const tsFile: string | undefined = process.argv[2];

if (!tsFile) {
    console.error("❌ Usage: npm run ts <src/file.ts> [options]");
    process.exit(1);
}

// Ensure it exists
if (!fs.existsSync(tsFile)) {
    console.error(`❌ File not found: ${tsFile}`);
    process.exit(1);
}

// 1. Compile everything
console.log("🔨 Compiling TypeScript...");
execSync("tsc", { stdio: "inherit" });

// 2. Compute output file path
// Example: src/[folders]/[files].ts → dist/[folders]/[files].js
const relPath: string = path.relative("src", tsFile);
const jsFile: string = path.join("dist", relPath).replace(/\.ts$/, ".js");

// 3. Run the compiled JS
console.log(`🚀 Running ${jsFile}...\n`);
execSync(`node "${jsFile}"`, { stdio: "inherit" });

console.log("\n✅ Done.");
