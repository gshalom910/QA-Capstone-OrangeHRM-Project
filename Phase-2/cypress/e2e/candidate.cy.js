import Login from "../support/Pages/Login";
import Candidate from "../support/Pages/Candidate";

describe("Orange HRM Recruitment Module Candidate Menu Testing", () => {
  // Login before each test
  beforeEach(function () {
    cy.fixture("loginData").then((userData) => {
      Login.visit();
      Login.enterUsername(userData.Username);
      Login.enterPassword(userData.Password);
      Login.clickLogin();
      Login.verifyLoginSuccess();
      Candidate.visit();
    });
    let sheet_name;

    if (this.currentTest.title.includes("Add Candidate")) {
      sheet_name = "AddCandidate";
    } else if (this.currentTest.title.includes("Search Candidate")) {
      sheet_name = "SearchCandidate";
    } else {
      sheet_name = "UpdateCandidate";
    }
    const path = "cypress/fixtures/candidate.xlsx";

    cy.readExcelFile({
      filePath: path,
      sheetName: sheet_name,
    }).then((data) => {
      cy.wrap(data).as("users");
    });
  });

  it("Add Candidate: Test Adding Candidates", function () {
    Candidate.clickAddCandidate();

    // Loop through candidate data
    cy.get("@users").each((data, index) => {
      const rowIndex = index + 2;
      Candidate.fillCandidateForm(data);
      Candidate.submitForm();

      // Assert if the candidate was added successfully
      if (data.Expected === "Success") {
        Candidate.verifySuccessMessage();
      } else if (data.Expected === "IncorrectFormat") {
        Candidate.verifyIncorrectMessage();
      } else {
        Candidate.verifyErrorMessage();
      }

      const status = data.Expected === "Success" ? "Passed" : "Failed";
      const path = "cypress/fixtures/candidate.xlsx";
      cy.updateExcelFile({
        filePath: path,
        sheetName: "AddCandidate",
        row: rowIndex,
        column: "H",
        newVal: status,
      }).then(() => {
        cy.log(`Updated Status for ${data.Username} to ${status} ${rowIndex}.`);
      });

      Candidate.visitAddCandidate();
    });
  });

  it("Search Candidate : Test Searching Functionality of Candidate Menu", function () {
    cy.get("@users").each((data) => {
      Candidate.fillCandidateSearch(data);
    });
  });
  it("Test Update Functionality of Candidate Menu", function () {
    cy.get("@users").each((data) => {
      Candidate.updateCandidate(data);
    });
  });
  it("Test delete Functionality of Candidate Menu", function () {
    cy.get("@users").each((data) => {
      Candidate.deleteSingleCandidate(data);
    });
  });
  it("Test Multiple Candidate delete Functionality of Candidate Menu", function () {
    Candidate.deleteMultipleCandidate();
  });
});
