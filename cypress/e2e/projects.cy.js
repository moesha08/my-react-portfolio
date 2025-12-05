// cypress/e2e/projects.cy.js

describe("Portfolio Project Tests", () => {

  const email = "cypress@test.com";        // FIXED – real test email
  const password = "pass123";              // FIXED – use a working password

  /* ----------------------------
      Ensure User Exists First
  ----------------------------- */
  const ensureUserExists = () => {
    return cy.request({
      method: "POST",
      url: "http://localhost:5000/api/auth/signup",
      failOnStatusCode: false, // important to avoid failure if already created
      body: {
        firstname: "Cypress",
        lastname: "Tester",
        email,
        password
      }
    });
  };

  beforeEach(() => {
    // 1️⃣ Make sure the user is created
    ensureUserExists();

    // 2️⃣ Login and store token
    cy.request("POST", "http://localhost:5000/api/auth/signin", {
      email,
      password
    }).then((res) => {
      expect(res.status).to.eq(200);
      window.localStorage.setItem("portfolio_token", res.body.token);
    });

    // 3️⃣ Visit admin page
    cy.visit("http://localhost:3000/admin/projects");
    cy.wait(1000);
  });

  /* ----------------------------
         ADD PROJECT
  ----------------------------- */
  it("Adds new project", () => {
    cy.get("form.project-form input").eq(0)
      .type("Cypress Automation Project");

    cy.get("form.project-form textarea")
      .type("This project was created with Cypress.");

    cy.contains("Add Project").click();
    cy.wait(1000);

    cy.contains("Cypress Automation Project").should("exist");
  });

  /* ----------------------------
         EDIT PROJECT
  ----------------------------- */
  it("Edits existing project", () => {
    cy.contains("Cypress Automation Project")
      .parents("tr")
      .find(".btn-edit")
      .click();

    cy.get(".modal-card input")
      .clear()
      .type("Cypress Project - Updated");

    cy.get(".modal-card textarea")
      .clear()
      .type("Updated via Cypress automation.");

    cy.contains("Save Changes").click();
    cy.wait(1000);

    cy.contains("Cypress Project - Updated").should("exist");
  });

  /* ----------------------------
         DELETE PROJECT
  ----------------------------- */
  it("Deletes project", () => {
    cy.contains("Cypress Project - Updated")
      .parents("tr")
      .find(".btn-delete")
      .click();

    cy.on("window:confirm", () => true);
    cy.wait(1000);

    cy.contains("Cypress Project - Updated").should("not.exist");
  });

});
