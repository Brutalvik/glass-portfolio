import { expect, test } from "./fixtures";

test.describe("smoke", () => {
  test("home page loads with every section", async ({ page }) => {
    const errors: string[] = [];

    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");

    await expect(page).toHaveTitle(/Vikram Kumar/);
    await expect(page.getByRole("heading", { level: 1, name: "Vikram Kumar" })).toBeVisible();
    await expect(page.getByText("Now", { exact: true })).toBeVisible();

    for (const id of ["about", "skills", "experience", "projects", "education", "contact"]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }

    expect(errors).toEqual([]);
  });

  test("case study pages render", async ({ page }) => {
    for (const [slug, name] of [
      ["torqlab", "TorqLab Automotive"],
      ["cervv", "Cervv"],
      ["aer-bulk-submission", "Regulatory Bulk Submission"],
    ]) {
      await page.goto(`/projects/${slug}`);
      await expect(page.getByRole("heading", { level: 1, name })).toBeVisible();
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", new RegExp(`/og/${slug}\\.jpg$`));
    }
  });

  test("unknown routes show the 404 page", async ({ page }) => {
    const res = await page.goto("/definitely-not-here");

    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Lost in the snow." })).toBeVisible();
  });
});
