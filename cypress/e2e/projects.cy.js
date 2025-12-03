describe("Portfolio Project Tests", () => {

  beforeEach(() => {
    // LOGIN FIRST
    cy.request("POST", "http://localhost:5000/api/auth/login", {
      email: "test@gmail.com",
      password: "123456"
    }).then((res) => {
      window.localStorage.setItem("portfolio_token", res.body.token);
    });

    cy.visit("http://localhost:3000/admin/projects");

    cy.wait(1000); // wait for table + form to render
  });

  /* ===========================
       1. CREATE PROJECT
  ============================*/
  it("Adds new project", () => {
    
    // selects first input under form (Title)
    cy.get("form.project-form input").eq(0)
      .type("Cypress Automation Project");

    // selects textarea (Description)
    cy.get("form.project-form textarea")
      .type("This project was created with Cypress.");

    cy.contains("Add Project").click();

    cy.wait(1000);
    cy.contains("Cypress Automation Project").should("exist");
  });

  /* ===========================
       2. EDIT PROJECT
  ============================*/
  it("Edits existing project", () => {

    cy.contains("Cypress Automation Project")
      .parents("tr")
      .find(".btn-edit")
      .click();

    cy.get(".modal-card input").clear().type("Cypress Project - Updated");
    cy.get(".modal-card textarea").clear().type("Updated using Cypress automation.");

    cy.contains("Save Changes").click();
    cy.wait(1000);

    cy.contains("Cypress Project - Updated").should("exist");
  });

  /* ===========================
       3. DELETE PROJECT
  ============================*/
  it("Deletes a project", () => {

    cy.contains("Cypress Project - Updated")
      .parents("tr")
      .find(".btn-delete")
      .click();

    cy.on("window:confirm", () => true); // auto confirm delete
    cy.wait(1000);

    cy.contains("Cypress Project - Updated").should("not.exist");
  });

});
