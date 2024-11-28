import { render, screen } from "@testing-library/react";
import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import { act } from "react";
import CompanyList from "./CompanyList";

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe("CompanyList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    const { container } = await act(async () => render(<CompanyList />));

    expect(container).toMatchSnapshot();
  });

  it("renders the list of companies", async () => {
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [
          { companyId: 1, companyName: "Company A", companyCountry: "US" },
          { companyId: 2, companyName: "Company B", companyCountry: "UK" },
          { companyId: 3, companyName: "Company C", companyCountry: "FI" },
        ],
      }),
    } as Response);

    await act(async () => render(<CompanyList />));

    const listItems = screen.getAllByRole("listitem");

    expect(listItems).toHaveLength(3);
  });

  it("handles fetch failure gracefully", async () => {
    (global.fetch as jest.MockedFunction<typeof fetch>).mockImplementationOnce(
      () => Promise.reject(new Error("Failed to fetch"))
    );

    await act(async () => render(<CompanyList />));

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
