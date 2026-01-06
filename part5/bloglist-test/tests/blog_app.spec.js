const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "wissem",
        username: "wissem",
        password: "wissem",
      },
    });
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "wissem1",
        username: "wissem1",
        password: "wissem1",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const usernameForm = page.getByLabel("username");
    const passwordForm = page.getByLabel("password");
    const loginButton = page.getByRole("button", { name: "login" });
    await expect(usernameForm).toBeVisible();
    await expect(passwordForm).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByLabel("username").fill("wissem");
      await page.getByLabel("password").fill("wissem");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("wissem logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByLabel("username").fill("wissemm");
      await page.getByLabel("password").fill("wissem");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("wrong username or password")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      // me
      await page.getByLabel("username").fill("wissem");
      await page.getByLabel("password").fill("wissem");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "create new blog" }).click();

      await page.getByLabel("title").fill("New Blog");
      await page.getByLabel("author").fill("wissem");
      await page.getByLabel("url").fill("www.newblog.com");

      await page.getByRole("button", { name: "create" }).click();

      await expect(page.getByText("New Blog wissem").first()).toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "create new blog" }).click();

      await page.getByLabel("title").fill("New Blog");
      await page.getByLabel("author").fill("wissem");
      await page.getByLabel("url").fill("www.newblog.com");

      await page.getByRole("button", { name: "create" }).click();

      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();

      await expect(page.getByText("likes 11")).toBeVisible();
    });

    test("a blog can be deleted", async ({ page }) => {
      await page.getByRole("button", { name: "create new blog" }).click();

      await page.getByLabel("title").fill("New Blog");
      await page.getByLabel("author").fill("wissem");
      await page.getByLabel("url").fill("www.newblog.com");

      await page.getByRole("button", { name: "create" }).click();

      await page.getByRole("button", { name: "view" }).click();

      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: "remove" }).click();

      await expect(page.getByText("New Blog wissem")).not.toBeVisible();
    });
  });
  describe("when the app is used by more than one uer", () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel("username").fill("wissem1");
      await page.getByLabel("password").fill("wissem1");
      await page.getByRole("button", { name: "login" }).click();

      await page.getByRole("button", { name: "create new blog" }).click();

      await page.getByLabel("title").fill("New Blog1");
      await page.getByLabel("author").fill("wissem1");
      await page.getByLabel("url").fill("www.newblog1.com");
      await page.getByRole("button", { name: "create" }).click();

      await expect(page.getByText("New Blog1 wissem1")).toBeVisible();
      await page.getByRole("button", { name: "logout" }).click();

      await page.getByLabel("username").fill("wissem");
      await page.getByLabel("password").fill("wissem");
      await page.getByRole("button", { name: "login" }).click();
    });
    test("the user who added the blog sees the blog's delete button", async ({
      page,
    }) => {
      await page.getByRole("button", { name: "view" }).first().click();
      await expect(
        page.getByRole("button", { name: "remove" }),
      ).not.toBeVisible();
    });

    test("blogs are in the right order", async ({ page }) => {
      await page.getByRole("button", { name: "create new blog" }).click();

      await page.getByLabel("title").fill("Second Blog");
      await page.getByLabel("author").fill("wissem");
      await page.getByLabel("url").fill("www.secondblog.com");

      await page.getByRole("button", { name: "create" }).click();

      await page.getByRole("button", { name: "view" }).first().click();
      await page.getByRole("button", { name: "like" }).first().click();
      await page.getByRole("button", { name: "like" }).first().click();
      await page.getByRole("button", { name: "like" }).first().click();

      await page.getByRole("button", { name: "hide" }).first().click();
      const blogs = page.locator("div", { hasText: /Blog/ });
      await expect(blogs.first()).toContainText("Second Blog");
      await expect(blogs.nth(1)).toContainText("New Blog1");
    });
  });
});
