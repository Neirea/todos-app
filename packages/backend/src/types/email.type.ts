export type TTransportOptions = {
  host: string | undefined;
  port: number;
  auth: {
    user: string | undefined;
    pass: string | undefined;
  };
};
