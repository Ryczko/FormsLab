/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    clearIndexedDB(): void;
    login(): void;
  }
}
