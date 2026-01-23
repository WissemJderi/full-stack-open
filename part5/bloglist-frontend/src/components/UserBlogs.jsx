import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";
import { Link, useParams } from "react-router-dom";
import blogs from "../services/blogs";

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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl text-center mb-4">{user.data.name}</h1>
      <p className="font-semibold text-2xl mb-2">Added Blogs</p>
      {user.data.blogs.length > 0 ? (
        <ul className="list-disc list-inside space-y-1">
          {user.data.blogs.map((blog) => (
            <li key={blog.id} className="cursor-pointer">
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>This user has no blogs yet</p>
      )}
    </div>
  );
};

export default UserBlogs;
