import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const viewport of VIEWPORTS) {
  test.describe(`forms at ${viewport.name} width`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("group class sign-up form can be filled in and submitted", async ({ page }) => {
      await page.goto("/schedule");

      await page.getByLabel("Full name").fill("Jordan Reyes");
      await page.getByLabel("Email").fill("jordan@example.com");
      await page.getByLabel("Choose a class").selectOption({ index: 1 });
      await page.getByRole("button", { name: "Reserve my spot" }).click();

      await expect(page.getByRole("status")).toContainText("spot is reserved");
      await expect(page.getByLabel("Full name")).toHaveValue("");
    });

    test("private session application form can be filled in and submitted", async ({ page }) => {
      await page.goto("/private-sessions");

      await page.getByLabel("Full name").fill("Jordan Reyes");
      await page.getByLabel("Email").fill("jordan@example.com");
      await page.getByLabel("Experience level").selectOption("Some experience");
      await page.getByLabel("What are you hoping to work on?").fill("More flexibility");
      await page.getByRole("button", { name: "Send application" }).click();

      await expect(page.getByRole("status")).toContainText("received your application");
      await expect(page.getByLabel("Full name")).toHaveValue("");
    });

    test("group class form blocks submission until required fields are filled", async ({ page }) => {
      await page.goto("/schedule");
      await page.getByRole("button", { name: "Reserve my spot" }).click();
      await expect(page.getByRole("status")).toHaveCount(0);
    });
  });
}
