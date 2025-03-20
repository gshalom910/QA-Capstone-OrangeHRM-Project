# QA-Capstone-OrangeHRM-Project

Automation (Cypress) and Performance (K6) test suite for OrangeHRM Website

This project contains two main phases for testing the **OrangeHRM** website:

- **Phase 1: Cypress Test Suite** - Automates functional and end-to-end tests using **Cypress** for testing the UI and workflows on the OrangeHRM platform Recruitment Module.
- **Phase 2: K6 Performance Testing** - Validates the performance and scalability of the OrangeHRM website using **K6** load testing framework.

## Phase 1: Cypress Test Suite

Objective:

This folder contains the Cypress test suite for automating the functional tests of the OrangeHRM platform.

Automate End-to-End (E2E) functional testing of the **Login Module** and **Recruitment Module** (Candidates and Vacancies) for the OrangeHRM application, ensuring core workflows perform as expected.

**Key Features & Implementation:**

- **Cypress Hooks:** Utilize `before()`, `beforeEach()`, `after()`, and `afterEach()` for setup, teardown, and test flow control.
- **Data-Driven Testing (DDT):** Read test data from external files to execute multiple input combinations.
- **Parameterization:** Dynamically pass test data for login, candidate, and vacancy scenarios.
- **Page Object Model (POM):** Improve reusability and readability by separating page-specific locators and actions.
- **Retries:** Handle flaky tests with Cypress’s built-in retry logic.
- **Reporting:** Generate test reports using **Mochawesome** .
- **Cypress Cloud Integration:** Monitor executions, invite team members, and share test results.

**Test Scenarios Automated:**

1. **Login Module:**
   - Valid login redirects to the dashboard.
   - Invalid login displays proper error messages.
   - Field validation for empty or invalid inputs.
2. **Recruitment Module - Candidates Menu:**
   - Add new candidate with valid data.
   - Validate mandatory fields.
   - Search candidates using filters (Job Title, Hiring Manager, Application Date).
3. **Recruitment Module - Vacancies Menu:**
   - Add new vacancy with valid data.
   - Validate mandatory fields.
   - Search vacancies by Job Title, Hiring Manager, and Number of Positions.

## Phase 2: Performance Testing with K6

**Objective:**

Evaluate the **Login Page's** performance under load, measuring system responsiveness, stability, and reliability.

**Key Features & Implementation:**

- **Parameterization:** Load multiple user credentials from JSON to simulate diverse users.
- **Assertions:** Validate system performance metrics (response time, error rate, throughput).
- **Load Scenarios:** Simulate ramp-up, ramp-down, and steady concurrent user loads.
- **Visualization with Grafana:** Export results for visualization, focusing on:
  - Average & peak response times
  - Error rates
  - Throughput (requests per second)
