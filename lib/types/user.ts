export type ApiUser = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
  address: {
    city: string;
  };
};
