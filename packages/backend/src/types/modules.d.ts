declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      JWT_SECRET: string;
      JWT_EXPIRATION: string;
    }
  }
  namespace Express {
    interface User {
      id: string;
      email: string;
      iat?: number;
      exp?: number;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
