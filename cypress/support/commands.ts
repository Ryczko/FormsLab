/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    clearIndexedDB(): void;
  }
}

Cypress.Commands.add('clearIndexedDB', async () => {
  window.indexedDB
    .databases()
    .then((databases) => {
      databases.forEach(({ name }) => {
        if (name) window.indexedDB.deleteDatabase(name);
      });
    })
    .catch((error) => {
      throw new Error(error);
    });
});
