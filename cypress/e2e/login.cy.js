describe("Portfolio Authentication Tests", () => {

  // generate random email every run so signup never conflicts
  const randomEmail = `test${Date.now()}@gmail.com`;
  const password = "freshpass123";

  // 1️⃣ SIGNUP → SHOULD PASS
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


  // 2️⃣ LOGIN → SHOULD PASS USING SAME RANDOM EMAIL
  it("Logs in successfully", () => {
    cy.request("POST", "http://localhost:5000/api/auth/login", {
      email: randomEmail,
      password
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("token");

      // save token for authenticated pages
      window.localStorage.setItem("portfolio_token", res.body.token);
    });
  });
});
