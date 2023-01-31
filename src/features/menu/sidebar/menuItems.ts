import { House, TrendUp, UsersThree } from 'phosphor-react';

const menuItems = [
  {
    to: '/',
    text: 'Home',
    icon: House,
    requiresAuth: false,
  },
  {
    to: '/feed/trending',
    text: 'Trending',
    icon: TrendUp,
    requiresAuth: false,
  },
  {
    to: '/feed/subscriptions',
    text: 'Subscriptions',
    icon: UsersThree,
    requiresAuth: true,
  },
];

export default menuItems;
