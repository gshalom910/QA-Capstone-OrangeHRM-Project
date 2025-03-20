class Login {
  visit() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  }

  enterUsername(username) {
    cy.wait(1100);
    cy.get('input[name="username"]').type(username);
  }

  enterPassword(password) {
    cy.wait(1100);
    cy.get('input[name="password"]').type(password);
  }

  clickLogin() {
    cy.get(".oxd-button").click();
    cy.wait(800);
  }

  verifyDashboard() {
    cy.url().should("include", "/dashboard/index");
    cy.wait(1100);
    cy.get(".oxd-userdropdown-tab").click();
    cy.wait(600);
    cy.get(":nth-child(4) > .oxd-userdropdown-link").click();
  }
  verifyLoginSuccess() {
    cy.url().should("include", "/dashboard/index");
  }

  verifyErrorMessage() {
    cy.get(".oxd-alert-content > .oxd-text")
      .should("be.visible")
      .and("contain", "Invalid credentials");
  }
  verifyRequiredMessage() {
    cy.contains("Required").should("be.visible");
  }
}

export default new Login();
