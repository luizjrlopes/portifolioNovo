#!/usr/bin/env node

/**
 * Script para restaurar a pasta API após o build
 */

const fs = require("fs");
const path = require("path");

const apiPath = path.join(__dirname, "..", "src", "app", "api");
const apiBackupPath = path.join(__dirname, "..", "src", "app", "api.backup");

// Restaura a pasta api de api.backup
if (fs.existsSync(apiBackupPath)) {
  console.log("♻️  Restaurando pasta API...");
  if (fs.existsSync(apiPath)) {
    fs.rmSync(apiPath, { recursive: true, force: true });
  }
  fs.renameSync(apiBackupPath, apiPath);
  console.log("✅ API restaurada");
} else {
  console.log("ℹ️  Nenhum backup da API encontrado");
}
