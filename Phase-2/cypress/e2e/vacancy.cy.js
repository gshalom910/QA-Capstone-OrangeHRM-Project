import Login from "../support/Pages/Login";
import Vacancy from "../support/Pages/Vacancy";

describe("Orange HRM Recruitment Module Vacancy Menu Testing", () => {
  // Login before each test
  beforeEach(function () {
    cy.fixture("loginData").then((userData) => {
      Login.visit();
      Login.enterUsername(userData.Username);
      Login.enterPassword(userData.Password);
      Login.clickLogin();
      Login.verifyLoginSuccess();
      Vacancy.visit();
    });
    let sheet_name;

    if (this.currentTest.title.includes("Add Vacancy")) {
      sheet_name = "AddVacancy";
    } else if (this.currentTest.title.includes("Search Vacancy")) {
      sheet_name = "SearchVacancy";
    } else {
      sheet_name = "UpdateVacancy";
    }
    const path = "cypress/fixtures/vacancy.xlsx";

    cy.readExcelFile({
      filePath: path,
      sheetName: sheet_name,
    }).then((data) => {
      cy.wrap(data).as("users");
    });
  });

  it("Add Vacancy : Test Adding Vacancy", function () {
    Vacancy.clickAddVacancy();

    // Loop through Vacancy data
    cy.get("@users").each((data, index) => {
      const rowIndex = index + 2;
      Vacancy.fillVacancyForm(data);
      Vacancy.submitForm();

      // Assert if the Vacancy was added successfully
      if (data.Expected === "Success") {
        Vacancy.verifySuccessMessage();
      } else {
        Vacancy.verifyErrorMessage();
      }

      const status = data.Expected === "Success" ? "Passed" : "Failed";
      const path = "cypress/fixtures/vacancy.xlsx";
      cy.updateExcelFile({
        filePath: path,
        sheetName: "AddVacancy",
        row: rowIndex,
        column: "G",
        newVal: status,
      }).then(() => {
        cy.log(`Updated Status for ${data.Username} to ${status} ${rowIndex}.`);
      });

      Vacancy.visitAddVacancy();
    });
  });

  it("Search Vacancy : Test Searching Functionality of Vacancy Menu", function () {
    cy.get("@users").each((data) => {
      Vacancy.fillVacancySearch(data);
    });
  });
  it("Test Update Functionality of Vacancy Menu", function () {
    cy.get("@users").each((data) => {
      Vacancy.updateVacancy(data);
    });
  });
  it("Test delete Functionality of Vacancy Menu", function () {
    cy.get("@users").each((data) => {
      Vacancy.deleteSingleVacancy(data);
    });
  });
  it("Test Multiple Vacancy delete Functionality of Vacancy Menu", function () {
    Vacancy.deleteMultipleVacancy();
  });
});
