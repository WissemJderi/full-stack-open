import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useQuery({ queryKey: ["users"], queryFn: userService.getAll });

  if (users.isLoading) {
    return <p>loading users...</p>;
  } else if (users.isError) {
    return <p>Error...</p>;
  }

  return (
    <div className="p-4 flex flex-col items-center gap-10">
      <h1 className="text-3xl text-center mb-4">Users</h1>
      <table className="table-auto border-collapse border-2 border-[#6F8F72] w-1/2 text-left">
        <thead className="bg-[#BFC6C4]">
          <tr>
            <th className="border border-[#6F8F72] px-4 py-2 font-semibold">
              Name
            </th>
            <th className="border border-[#6F8F72] px-4 py-2 font-semibold">
              Blogs Created
            </th>
          </tr>
        </thead>
        <tbody>
          {users.data.map((user) => (
            <tr key={user.id} className="odd:bg-white even:bg-gray-50">
              <td className="border border-[#6F8F72]  px-4 py-2 text-black font-semibold">
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td className="border border-[#6F8F72] px-4 py-2">
                {user.blogs ? user.blogs.length : 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
