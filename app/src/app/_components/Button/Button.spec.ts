import { temp } from "./Button";
import { describe, expect, it } from "vitest";

describe("Button", () => {
  it("should return 'success'", () => {
    expect(temp()).toBe("success");
  });
});
