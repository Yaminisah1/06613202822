import { v4 as uuidv4 } from 'uuid';

export const generateShortCode = () => uuidv4().slice(0, 6);

export const calculateExpiry = (minutes) => {
  const now = new Date();
  return new Date(now.getTime() + minutes * 60000);
};
