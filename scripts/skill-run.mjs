#!/usr/bin/env node
import fs from "fs"; import path from "path";
import toml from "toml"; import yaml from "js-yaml";

const cfg = toml.parse(fs.readFileSync("config.toml","utf8"));
const reg = yaml.load(fs.readFileSync("skills/registry.yaml","utf8"));
const skillId = process.argv[2];      // e.g. shopify.build
const payload = JSON.parse(process.argv[3] || "{}");

if(!skillId) { console.error("Usage: skill-run <skillId> '{\"k\":\"v\"}'"); process.exit(1); }
const entry = reg.catalog[skillId]; if(!entry) throw new Error("Skill not found");

const skillDir = `skills/${skillId}`;
const skillMd = `${skillDir}/SKILL.md`;
if(!fs.existsSync(skillMd)) throw new Error(`Missing ${skillMd}`);

console.log(`::load-skill:: ${skillId}`);
console.log(fs.readFileSync(skillMd,"utf8"));
console.log("::inputs::", JSON.stringify(payload));
