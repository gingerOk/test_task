import { useEffect } from "react";
import { useUser, loadUsers, deleteUser } from "../../contexts/UserContext";

const ButtonRemove = (user) => {
  const [, dispatch] = useUser();
  return (
    <span
      onClick={() => deleteUser(dispatch, user)}
      className="btn btn-warning mt-2 w-50"
    >
      YES
    </span>
  );
};

const UsersPage = () => {
  const [{ users }, dispatch] = useUser();

  useEffect(() => {
    loadUsers(dispatch);
  }, [dispatch]);
  return (
    <table>
      {users.map((user) => (
        <tr>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>
            <ButtonRemove user={user} />
          </td>
        </tr>
      ))}
    </table>
  );
};

export default UsersPage;
