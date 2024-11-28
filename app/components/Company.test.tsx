import { render } from "@testing-library/react";
import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import { act } from "react";
import Company from "./Company";
import { ICompany } from "../types/company";

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe("Company", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    const company = { companyName: "Company A" } as ICompany;

    const { container } = await act(async () =>
      render(<Company {...company} />)
    );

    expect(container).toMatchSnapshot();
  });
});
