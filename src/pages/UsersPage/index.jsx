import { useEffect } from "react";
import { useUser, loadUsers, deleteUser } from "../../contexts/UserContext";

const ButtonRemove = (user) => {
  const [, dispatch] = useUser();
  console.log(user)
  return (
    <span
      onClick={() => deleteUser(dispatch, user)}
      className="btn btn-warning py-0"
    >
     Remove
    </span>
  );
};

const UsersPage = () => {
  const [{ users }, dispatch] = useUser();
  useEffect(() => {
    loadUsers(dispatch);
  }, [dispatch]);
  
  return (
    <div className="container">
      <h1 className="text-center">Users</h1>
    <table className="table table-striped">
      <tbody>
      {users.map((user) => (
        <tr key={user.username} className="row text-center">
          <td className="col">{user.username}</td>
          <td className="col">{user.email}</td>
          <td className="col">
            <ButtonRemove user={user} />
          </td>
        </tr>
      ))}
      </tbody>
    </table>
    </div>
  );
};

export default UsersPage;
