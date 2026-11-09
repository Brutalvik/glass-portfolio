import { expect, test } from "./fixtures";

test.describe("skills to experience", () => {
  test("selecting a skill highlights matching roles and dims the rest", async ({ page }) => {
    await page.goto("/#skills");

    const chip = page.locator("#skills").getByRole("button", { name: /^Java Spring Boot/ });

    await chip.click();
    await expect(chip).toHaveAttribute("aria-pressed", "true");

    const panel = page.locator('[aria-live="polite"]').filter({ hasText: "Java Spring Boot" });

    await expect(panel).toBeVisible();
    await expect(panel.getByRole("link", { name: "GSTS" })).toBeVisible();

    await expect(page.locator("#role-gsts")).toHaveClass(/is-match/);
    await expect(page.locator("#role-aer")).toHaveClass(/is-dimmed/);

    await panel.getByRole("button", { name: "Clear" }).click();
    await expect(page.locator("#role-aer")).not.toHaveClass(/is-dimmed/);
  });

  test("category tabs filter skill groups and support arrow keys", async ({ page }) => {
    await page.goto("/#skills");
    const tabs = page.getByRole("tablist", { name: "Skill categories" });

    await tabs.getByRole("tab", { name: "Databases" }).click();
    await expect(page.locator("#skill-panel").getByRole("heading", { name: "Databases" })).toBeVisible();
    await expect(page.locator("#skill-panel").getByRole("heading", { name: "Frontend" })).toHaveCount(0);

    await page.keyboard.press("ArrowRight");
    await expect(tabs.getByRole("tab", { name: "Cloud and DevOps" })).toHaveAttribute("aria-selected", "true");
  });
});

test.describe("contact form", () => {
  const fill = async (page: import("@playwright/test").Page) => {
    await page.goto("/#contact");
    await page.getByPlaceholder("Your name").fill("Jane Appleseed");
    await page.getByPlaceholder("you@company.com").fill("jane@example.com");
    await page.getByPlaceholder("What are you working on?").fill("We have a senior React role and would love to talk.");
  };

  test("shows success when the API accepts the message", async ({ page }) => {
    let body: Record<string, string> = {};

    await page.route("**/api/contact", async (route) => {
      body = route.request().postDataJSON();
      await route.fulfill({ status: 200, json: { ok: true } });
    });

    await fill(page);
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("Message sent.")).toBeVisible();
    await expect(page.getByText("jane@example.com")).toBeVisible();
    expect(body.name).toBe("Jane Appleseed");
    expect(body.company ?? "").toBe("");
  });

  test("shows the server error and a direct email fallback", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 502, json: { error: "Could not send right now." } }),
    );

    await fill(page);
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText(/Could not send right now\./)).toBeVisible();
    await expect(page.locator("#contact").getByRole("link", { name: /@gmail\.com/ }).last()).toBeVisible();
  });
});

test.describe("contact API", () => {
  test("rejects invalid input", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { name: "J", email: "not-an-email", message: "Hello there, this is long enough." },
    });

    expect(res.status()).toBe(400);
    expect((await res.json()).error).toMatch(/valid email/);
  });

  test("silently accepts honeypot submissions without sending", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { name: "Bot", email: "bot@example.com", message: "Buy cheap things now please", company: "Spam Inc" },
    });

    expect(res.status()).toBe(200);
  });

  test("reports when no email provider is configured", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { name: "Jane", email: "jane@example.com", message: "A genuine message for you." },
    });

    expect(res.status()).toBe(503);
  });
});

test.describe("time of day", () => {
  test.use({ hour: 23 });

  test("slider switches scenes and the light/dark theme", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");

    await expect(html).toHaveAttribute("data-theme", "dark");

    await page.getByRole("button", { name: /Change scene/ }).click();
    const slider = page.getByRole("slider");

    // Index 5 is Noon (light glass)
    await slider.fill("5");
    await expect(html).toHaveAttribute("data-theme", "light");
    await expect(html).toHaveAttribute("data-scene", "noon");
    await expect(page.getByText("Previewing", { exact: true })).toBeVisible();

    // Back to the live clock
    await page.getByRole("button", { name: "Live" }).click();
    await expect(html).toHaveAttribute("data-theme", "dark");
    await expect(page.getByText("Your local time", { exact: true })).toBeVisible();
  });
});

test.describe("booking", () => {
  test("Book a call opens the calendar in a modal", async ({ page }) => {
    await page.route(/cal\.com|calendly\.com/, (route) =>
      route.fulfill({ status: 200, contentType: "text/html", body: "<h1>Calendar</h1>" }),
    );
    await page.goto("/#contact");

    const button = page.locator("#contact").getByRole("button", { name: /Book a/ });

    test.skip((await button.count()) === 0, "NEXT_PUBLIC_BOOKING_URL not set for this build");

    await button.click();
    const dialog = page.getByRole("dialog", { name: "Pick a time that works for you" });

    await expect(dialog).toBeVisible();
    await expect(dialog.locator("iframe")).toHaveAttribute("src", /embed/);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});
