const { defineConfig } = require("cypress");

const xlsx = require("xlsx");

module.exports = defineConfig({
  projectId: "1pwxyq",
  reporter: "cypress-mochawesome-reporter",
  video: true,
  retries: 1,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      require("cypress-mochawesome-reporter/plugin")(on);
      // Excel File Reading
      on("task", {
        readExcel({ filePath, sheetName }) {
          const workbook = xlsx.readFile(filePath);
          const sheet = workbook.Sheets[sheetName];
          return xlsx.utils.sheet_to_json(sheet);
        },
      });

      // Task For Excel File Updating
      on("task", {
        updateExcel({ filePath, sheetName, row, column, newVal }) {
          const workbook = xlsx.readFile(filePath);
          const worksheet = workbook.Sheets[sheetName];
          const cellRef = `${column}${row}`;
          worksheet[cellRef] = { v: newVal };
          xlsx.writeFile(workbook, filePath);
          return workbook;
        },
      });
    },
  },
});
