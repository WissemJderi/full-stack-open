import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";
import { useParams } from "react-router-dom";

const UserBlogs = () => {
  const { id } = useParams();

  const user = useQuery({
    queryKey: ["user", id],
    queryFn: () => userService.getUser(id),
  });

  if (user.isLoading) {
    return <p>loading user data...</p>;
  }

  if (user.isError) {
    return <p>failed to load user data</p>;
  }

  return (
    <div>
      <h1>{user.data.name}</h1>
      <p>added blogs</p>
      <ul>
        {user.data.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserBlogs;
