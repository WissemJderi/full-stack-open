import { useQuery, useQueryClient } from "@tanstack/react-query";
import userService from "../services/users";

const Users = () => {
  const users = useQuery({ queryKey: ["users"], queryFn: userService.getAll });

  if (users.isLoading) {
    return <p>loading users...</p>;
  } else if (users.isError) {
    return <p>Error...</p>;
  }

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.data.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs ? user.blogs.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
