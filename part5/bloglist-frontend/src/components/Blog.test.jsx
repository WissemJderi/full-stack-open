import { render, screen } from "@testing-library/react";
import Blog from "./Blog.jsx";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

test("renders blogs", () => {
  const blog = {
    title: "JS Is great",
    author: "Wissem",
    url: "www.blog.com",
    likes: 10,
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText("JS Is great Wissem");
  const url = screen.queryByText("www.blog.com");
  const likes = screen.queryByText("10");

  expect(element).toBeDefined();
  expect(url).toBeNull();
  expect(likes).toBeNull();
});

test("after clicking the button, url and likes are displayed", async () => {
  const blog = {
    title: "JS Is great",
    author: "Wissem",
    url: "www.blog.com",
    likes: 10,
    user: { name: "wissem" },
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const url = screen.getByText("www.blog.com");
  const likes = screen.getByText("likes 10");

  expect(url).toBeVisible();
  expect(likes).toBeVisible();
});

test("clicking the like button twice", async () => {
  const blog = {
    title: "JS Is great",
    author: "Wissem",
    url: "www.blog.com",
    likes: 10,
    user: { name: "wissem" },
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} handleLike={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const like = screen.getByText("like");
  await user.click(like);
  await user.click(like);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
