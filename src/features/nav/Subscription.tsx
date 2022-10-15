import Avatar from "../../components/Avatar";
import { useGetUserQuery } from "../user/userApiSlice";
import { NavLink } from "react-router-dom";

interface Props {
  userId: string;
  closeMenu: () => void;
}
const Subscription = ({ userId, closeMenu }: Props) => {
  const { data: user } = useGetUserQuery(userId);

  return (
    <li onClick={closeMenu}>
      <NavLink to={`user/${userId}`} className="flex items-center">
        <Avatar src={user?.image} size="sm" alt={user?.name} />
        <span>{user?.name}</span>
      </NavLink>
    </li>
  );
};

export default Subscription;
