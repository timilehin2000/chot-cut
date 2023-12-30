import jwt from "jsonwebtoken";

export const generateJwtToken = (
  apiKeyId: string,
  issuerId: string,
  bundleId: string,
  privateKey: string
) => {
  const currentTime = Math.floor(Date.now() / 1000);

  const headers = {
    alg: "ES256",
    kid: apiKeyId,
  };

  const payload = {
    iss: issuerId,
    iat: currentTime,
    exp: currentTime + 3600,
    aud: "appstoreconnect-v1",
    bid: bundleId,
  };

  const token = jwt.sign(payload, privateKey, {
    algorithm: "ES256",
    header: headers,
  });

  return token;
};
