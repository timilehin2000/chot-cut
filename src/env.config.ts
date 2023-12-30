import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || "3000";
const nodeEnv = process.env.NODE_ENV || "development";
const keyId = process.env.KEY_ID || "";
const issuerId = process.env.ISSUER_ID || "";
const bundleId = process.env.BUNDLE_ID || "";
const subKey = process.env.SUB_KEY || "";

export = {
  port,
  nodeEnv,
  keyId,
  issuerId,
  bundleId,
  subKey,
};
