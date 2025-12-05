// cypress/e2e/authentication.cy.js

describe("Portfolio Authentication Tests", () => {

  const randomEmail = `test${Date.now()}@gmail.com`;
  const password = "freshpass123";

  // 1️⃣ SIGNUP
  it("Signs up a new user", () => {
    cy.request("POST", "http://localhost:5000/api/auth/signup", {
      firstname: "Fresh",
      lastname: "Cypress",
      email: randomEmail,
      password
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("user");
    });
  });

  // 2️⃣ SIGNIN
  it("Signs in successfully", () => {
    cy.request("POST", "http://localhost:5000/api/auth/signin", {
      email: randomEmail,
      password
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("token");

      // Save token for later specs
      window.localStorage.setItem("portfolio_token", res.body.token);
    });
  });

});
