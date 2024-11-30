describe("Page", () => {
  it("should show the home page", () => {
    cy.intercept("GET", "/api/companies", {
      statusCode: 200,
      body: {
        data: [
          { companyId: 1, companyName: "Company A", companyCountry: "US" },
          { companyId: 2, companyName: "Company B", companyCountry: "UK" },
        ],
      },
    }).as("getCompanies");

    cy.visit("http://localhost:3000/");

    cy.get("header > p").contains("Quartr");

    cy.wait("@getCompanies");

    cy.findAllByRole("listitem").should("have.length", 2);

    // Verify the text content of the first list item
    cy.findAllByRole("listitem").first().should("contain.text", "Company A");
  });
});
