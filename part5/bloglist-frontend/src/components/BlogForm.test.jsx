import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("calls the event handler with correct details when a new blog is created", async () => {
  const createBlog = vi.fn();

  render(<BlogForm createBlog={createBlog} />);

  const user = userEvent.setup();

  const titleInput = screen.getByPlaceholderText("title");
  const authorInput = screen.getByPlaceholderText("author");
  const urlInput = screen.getByPlaceholderText("url");
  const submitButton = screen.getByText("create");

  await user.type(titleInput, "Why JS is so popular");
  await user.type(authorInput, "Wissem Jderi");
  await user.type(urlInput, "www.google.com");

  await user.click(submitButton);

  expect(createBlog).toHaveBeenCalledTimes(1);

  expect(createBlog).toHaveBeenCalledWith({
    title: "Why JS is so popular",
    author: "Wissem Jderi",
    url: "www.google.com",
    likes: 10,
  });
});
