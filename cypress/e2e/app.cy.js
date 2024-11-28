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

    cy.get("h2").contains("Quartr");

    cy.wait("@getCompanies");

    // Find the <div> containing the list of <li> tags
    cy.get("div")
      .find("li")
      .should("have.length", 2)
      .and(($items) => {
        expect($items[0]).to.contain.text("Company A");
        expect($items[1]).to.contain.text("Company B");
      });
  });
});
