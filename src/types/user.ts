export default interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
  subscribers: number;
  subscriptions: string[];
  image: string;
}
