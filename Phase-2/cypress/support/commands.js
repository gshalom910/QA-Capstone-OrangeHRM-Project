// ***********************************************
import "cypress-file-upload";
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom Command for Reading Excel File
Cypress.Commands.add("readExcelFile", ({ filePath, sheetName }) => {
  return cy.task("readExcel", { filePath, sheetName });
});

// Custom Command for Updating Excel File
Cypress.Commands.add(
  "updateExcelFile",
  ({ filePath, sheetName, row, column, newVal }) => {
    return cy.task("updateExcel", { filePath, sheetName, row, column, newVal });
  }
);
