import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '../../../../components/Avatar';
import { useGetUserQuery } from '../../../user/userApiSlice';

interface Props {
  userId: string;
  closeMenu: () => void;
}
const Subscription: FC<Props> = ({ userId, closeMenu }) => {
  const { data: user } = useGetUserQuery(userId);

  return (
    <li onClick={closeMenu}>
      <NavLink
        to={`user/${userId}`}
        className="flex items-center"
      >
        <Avatar
          src={user?.image}
          size="sm"
          alt={user?.name}
        />
        <span>{user?.name}</span>
      </NavLink>
    </li>
  );
};

export default Subscription;
