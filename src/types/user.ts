export type User = {
  id: string;
  name: string | null;
  email: string;
  type: string | null;
  joiningAt: Date;
  emailVerified: Date | null;
  image: string | null;
};
