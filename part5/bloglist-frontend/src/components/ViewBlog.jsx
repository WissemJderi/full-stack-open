import { useParams } from "react-router-dom";
import blogService from "../services/blogs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const ViewBlog = ({ handleLike }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState("");

  const blog = useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogService.getBlog(id),
  });

  const addCommentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", id]);
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    addCommentMutation.mutate({ id, comment: newComment });
    setNewComment("");
  };

  if (blog.isLoading) {
    return <p>loading the blog...</p>;
  }
  if (blog.isError) {
    return <p>failed to load the blog</p>;
  }

  const blogData = blog.data;
  return (
    <div>
      <h1>{blogData.title}</h1>
      <a href={blogData.url}>{blogData.url}</a>
      <p>
        likes {blogData.likes}
        <button
          onClick={() => {
            handleLike(blogData);
          }}
        >
          like
        </button>
      </p>
      <p>added by {blogData.user.name}</p>

      <p>
        <strong>comments</strong>
      </p>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blogData.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewBlog;
