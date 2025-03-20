import Login from "../support/Pages/Login";

describe("Orange HRM Login Module Data Driven Testing with Excel in Cypress", () => {
  before(function () {
    const path = "cypress/fixtures/LoginData.xlsx";
    const sheet_name = "LoginDatas";

    cy.readExcelFile({
      filePath: path,
      sheetName: sheet_name,
    }).then((data) => {
      this.users = data;
    });
  });

  beforeEach(() => {
    Login.visit();
  });

  it("Reads login data and performs tests", function () {
    expect(this.users).to.exist;

    this.users.forEach((row, index) => {
      const rowIndex = index + 2;
      cy.log(`Username: ${row.Username}, Password: ${row.Password}`);

      if (row.Username) {
        Login.enterUsername(row.Username);
      }
      if (row.Password) {
        Login.enterPassword(row.Password);
      }

      Login.clickLogin();
      cy.wait(3000);

      if (row.Expected === "Pass") {
        Login.verifyDashboard();
      } else if (row.Expected === "Fail") {
        Login.verifyErrorMessage();
      } else {
        Login.verifyRequiredMessage();
        cy.wait(500);
        cy.reload();
      }
      const path = "cypress/fixtures/LoginData.xlsx";
      const sheet_name = "LoginDatas";
      const status = row.Expected === "Pass" ? "Passed" : "Failed";
      cy.updateExcelFile({
        filePath: path,
        sheetName: sheet_name,
        row: rowIndex,
        column: "D",
        newVal: status,
      }).then(() => {
        cy.log(`Updated Status for ${row.Username} to ${status} ${rowIndex}.`);
      });
    });
  });
});
