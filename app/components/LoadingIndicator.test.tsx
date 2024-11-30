import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, it, expect } from "vitest";
import LoadingIndicator from "./LoadingIndicator";

describe("LoadingIndicator", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders the loading indicator", () => {
    render(<LoadingIndicator />);

    expect(screen.getByRole("status")).toBeDefined();
  });
});
