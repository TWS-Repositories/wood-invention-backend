import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export const hashPassword = async (password: string): Promise<string> => {
  if (!password || password.length === 0) {
    throw new Error('La contraseña no puede estar vacía');
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return hash;
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  if (!password || !hash) {
    throw new Error('La contraseña y el hash son requeridos');
  }

  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
