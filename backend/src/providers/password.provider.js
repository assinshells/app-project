import crypto from "crypto";

const HASH_KEYLEN = 64;

const hashRaw = (password, salt) =>
  new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, HASH_KEYLEN, (err, key) => {
      if (err) reject(err);
      else resolve(key.toString("hex"));
    });
  });

export const PasswordProvider = {
  async hash(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = await hashRaw(password, salt);
    return `${salt}:${hash}`;
  },

  async verify(password, stored) {
    const [salt, hash] = stored.split(":");
    const candidate = await hashRaw(password, salt);
    return crypto.timingSafeEqual(
      Buffer.from(candidate, "hex"),
      Buffer.from(hash, "hex"),
    );
  },
};
