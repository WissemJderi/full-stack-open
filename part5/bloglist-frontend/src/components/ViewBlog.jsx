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
    <div className="p-6 bg-[#E8E2D8] max-w-xl mx-auto">
      <h1 className="text-3xl text-center mb-4">{blogData.title}</h1>
      <a href={blogData.url} className="block mb-2 hover:underline">
        <span className="font-semibold">Url:</span> {blogData.url}
      </a>
      <p className="mb-2">
        <span className="font-semibold">Likes:</span> {blogData.likes}
        <button
          onClick={() => {
            handleLike(blogData);
          }}
          className="ml-2 px-3 py-1  bg-[#F2A65A] text-white hover:bg-[#6F8F72] cursor-pointer transition"
        >
          like
        </button>
      </p>
      <p className="mb-4">
        <span className="font-semibold">Added by:</span> {blogData.user.name}
      </p>

      <p className="font-semibold text-[#6F8F72] mb-2 text-lg">Comments</p>
      <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          className="flex-1 border border-[#BFC6C4] px-2 py-1"
        />
        <button
          type="submit"
          className="px-3 py-1 text-white bg-[#F2A65A] hover:bg-[#6F8F72] transition cursor-pointer"
        >
          add comment
        </button>
      </form>
      <ul className="list-disc list-inside space-y-1 text-[#6F8F72]">
        {blogData.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewBlog;
