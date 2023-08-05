import { faker } from '@faker-js/faker';

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

// TODO: find better way to do this
Cypress.Commands.add('login', () => {
  const name = faker.name.fullName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  cy.visit('/signup');
  cy.get('input[name="name"]').type(name);
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);

  cy.get('form').submit();
  cy.url().should('include', '/');
});
