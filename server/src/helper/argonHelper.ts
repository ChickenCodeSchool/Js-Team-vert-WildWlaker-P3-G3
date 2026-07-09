import argon2 from "argon2";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (plainPassword: string): Promise<string> =>
  argon2.hash(plainPassword, hashingOptions);

const verifyPassword = (
  hash: string,
  plainPassword: string,
): Promise<boolean> => argon2.verify(hash, plainPassword);

export { hashPassword, verifyPassword };
