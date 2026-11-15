import { describe, it, expect } from "vitest";
import nextConfig, { legacyRedirects } from "../../next.config";

describe("legacy redirects", () => {
  it("sends /work-with-me to /services and /ai to the AI section", async () => {
    const redirects = await nextConfig.redirects!();
    const map = Object.fromEntries(redirects.map((r) => [r.source, r]));
    expect(map["/work-with-me"]).toMatchObject({ destination: "/services", permanent: true });
    expect(map["/ai"]).toMatchObject({ destination: "/services#ai", permanent: true });
  });

  it("no longer redirects /services anywhere (it's a real page now)", async () => {
    const redirects = await nextConfig.redirects!();
    expect(redirects.map((r) => r.source)).not.toContain("/services");
  });

  it("only redirects routes whose pages were removed", () => {
    expect(legacyRedirects.map((r) => r.source)).toEqual(["/work-with-me", "/ai"]);
  });
});
