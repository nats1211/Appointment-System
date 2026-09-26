import { spawn } from "node:child_process";

const token = process.env.NGROK_AUTHTOKEN;

if (!token) {
  console.error(
    "NGROK_AUTHTOKEN is missing from the process environment.\n" +
      "Add it to .env.local, then run: npm run tunnel",
  );
  process.exit(1);
}

const child = spawn(
  "npx",
  ["ngrok", "http", "3000", "--authtoken", token],
  { stdio: "inherit", shell: true },
);

child.on("exit", (code) => process.exit(code ?? 1));
