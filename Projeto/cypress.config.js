const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:8000",
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: false,
    specPattern: 'Projeto/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
