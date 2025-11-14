#!/usr/bin/env node

/**
 * Script para preparar o build para GitHub Pages
 * Remove temporariamente a pasta api para permitir export estático
 */

const fs = require("fs");
const path = require("path");

const apiPath = path.join(__dirname, "..", "src", "app", "api");
const apiBackupPath = path.join(__dirname, "..", "src", "app", "api.backup");

// Move a pasta api para api.backup
if (fs.existsSync(apiPath)) {
  console.log("📦 Movendo pasta API temporariamente...");
  if (fs.existsSync(apiBackupPath)) {
    fs.rmSync(apiBackupPath, { recursive: true, force: true });
  }
  fs.renameSync(apiPath, apiBackupPath);
  console.log("✅ API movida para api.backup");
} else {
  console.log("ℹ️  Pasta API já está removida");
}
