class Vacancy {
  visit() {
    cy.get(":nth-child(5) > .oxd-main-menu-item").click();
    cy.get(".oxd-topbar-body-nav > ul > :nth-child(2)").click();
    cy.get(".oxd-table-filter-header-title > .oxd-text")
      .should("be.visible")
      .and("contain", "Vacancies");
    cy.wait(1100);
  }

  clickAddVacancy() {
    cy.get(".orangehrm-header-container > .oxd-button").click();
    cy.url().should("include", "/recruitment/addJobVacancy");
    cy.wait(1200);
  }

  fillVacancyForm(data) {
    if (data.VacancyName) {
      cy.get(
        ".oxd-form > :nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input"
      ).type(data.VacancyName);
      cy.wait(1200);
    }
    if (data.JobTitle) {
      cy.get(".oxd-select-text").as("job");
      cy.get("@job").click();
      cy.wait(3000);

      cy.get(".oxd-select-option").each(function ($ele) {
        if ($ele.text() === data.JobTitle) {
          cy.wrap($ele).click();
        }
      });
      cy.wait(1200);
    }

    cy.get(".oxd-textarea").type(data.Desc);
    cy.wait(1200);

    if (data.HiringManager) {
      cy.get(".oxd-autocomplete-text-input > input").type(data.HiringManager);
      cy.wait(4000);
      cy.get(".oxd-autocomplete-option")
        .as("btn")
        .first()
        .should("contain.text", data.HiringManager);
      cy.get("@btn").click();
      cy.wait(1200);
    }
    cy.get(
      ".oxd-grid-2 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input"
    ).type(data.PositionNo);
    cy.wait(1100);

    cy.get(".oxd-button--secondary").click();
  }

  submitForm() {
    cy.get(".oxd-button--secondary").click();
  }

  verifySuccessMessage() {
    // cy.get(".oxd-toast").should("contain", "Successfully Saved");
    cy.contains("Attachments");
  }

  verifyErrorMessage() {
    cy.get(".oxd-input-group > .oxd-text")
      .contains("Required")
      .should("be.visible");
  }

  ResetSearch() {
    cy.get(".oxd-button--ghost").click();
    cy.wait(1100);
  }
  visitAddVacancy() {
    cy.wait(1200);
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addJobVacancy"
    );
  }
  fillVacancySearch(data) {
    if (data.JobTitle) {
      cy.get(
        ":nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon"
      ).click();
      cy.wait(3000);
      cy.get(".oxd-select-option").each(function ($ele) {
        if ($ele.text() === data.JobTitle) {
          cy.wrap($ele).click();
        }
      });
      cy.wait(1200);
      cy.get(".oxd-form-actions > .oxd-button--secondary").click();
      cy.get(".oxd-table .oxd-table-body .oxd-table-card").each(($row) => {
        cy.wrap($row)
          .find(".oxd-table-cell")
          .eq(2)
          .should("have.text", data.JobTitle);
      });
      cy.wait(1200);
    }
    if (data.VacancyStatus) {
      this.ResetSearch();
      cy.get(
        ":nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text"
      ).click();
      cy.get("span[data-v-13cf171c]").each(function ($ele) {
        if ($ele.text() === data.VacancyStatus) {
          cy.wrap($ele).click();
        }
      });
      cy.wait(1200);
      cy.get(".oxd-form-actions > .oxd-button--secondary").click();
      cy.get(".oxd-table .oxd-table-body .oxd-table-card").each(($row) => {
        cy.wrap($row)
          .find(".oxd-table-cell")
          .eq(4)
          .should("have.text", data.VacancyStatus);
      });
      cy.wait(1200);
    }
  }
  updateVacancy(data) {
    this.fillVacancySearch(data);
    cy.get(".oxd-table .oxd-table-body .oxd-table-card")
      .eq(0)
      .find(".oxd-table-cell")
      .eq(5)
      .find(".oxd-icon-button")
      .eq(1)
      .click();
    cy.wait(1200);
    if (data.HiringManager) {
      cy.get(".oxd-autocomplete-text-input > input")
        .clear()
        .type(data.HiringManager);
      cy.intercept(
        "GET",
        "/web/index.php/api/v2/pim/employees?nameOrId=Shalom&includeEmployees=onlyCurrent"
      ).as("loading");
      cy.wait("@loading");
      cy.get(".oxd-autocomplete-option")
        .as("btn")
        .first()
        .should("have.text", data.Hiring_Manager);
      cy.get("@btn").first().click();
    }
    cy.wait(1200);
    cy.get(".oxd-button--secondary").click();
    // cy.contains("Successfully Updated");
    // cy.get(".oxd-toast").should("contain", "Successfully Updated");
  }
  deleteSingleVacancy(data) {
    this.fillVacancySearch(data);
    cy.wait(1200);
    cy.get(".oxd-table .oxd-table-body .oxd-table-card")
      .eq(0)
      .find(".oxd-table-cell")
      .eq(5)
      .find(".oxd-icon-button")
      .eq(0)
      .click();

    cy.get(".orangehrm-text-center-align > .oxd-text").contains(
      "The selected record will be permanently deleted. Are you sure you want to continue?"
    );
    cy.wait(1200);

    cy.get(".oxd-button--label-danger").click();
    cy.get(".oxd-toast").should("have.text", "InfoNo Records Found×");
  }
  deleteMultipleVacancy() {
    cy.get(".oxd-table .oxd-table-body .oxd-table-card")
      .find(".oxd-table-cell")
      .eq(0)
      .find('input[type="checkbox"]')
      .check({ force: true })
      .should("be.checked");
    cy.wait(1200);

    cy.get(".orangehrm-horizontal-padding > div > .oxd-button").click();

    cy.get(".orangehrm-text-center-align > .oxd-text").contains(
      "The selected record will be permanently deleted. Are you sure you want to continue?"
    );
    cy.wait(1200);
    cy.get(".orangehrm-modal-footer > .oxd-button--ghost").click();
    cy.wait(1200);
    cy.get(".oxd-table .oxd-table-body .oxd-table-card")
      .find(".oxd-table-cell")
      .eq(0)
      .find('input[type="checkbox"]')
      .should("be.checked");
  }
}

export default new Vacancy();
