import crypto from 'node:crypto';

export const createHash = (string: string) => crypto.createHash('md5').update(string).digest('hex');

export const generateToken = () => crypto.randomBytes(40).toString('hex');
