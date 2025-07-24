export type User = {
  username: string;
  account_type: "admin" | "user";
  email: string;
  user_id: string;
  exp: number;
};
