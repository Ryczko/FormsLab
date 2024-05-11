import { faker } from '@faker-js/faker';

describe('Authorization tests', () => {
  it('should not redirect to home page when login fails', () => {
    cy.visit('/login');
    cy.title().should('include', 'Login');
    cy.get('input[type="email"]').type(faker.internet.email());
    cy.get('input[type="password"]').type(faker.internet.password());
    cy.get('form').submit();
    cy.url().should('include', '/login');
  });

  it('should sign up via email and password and redirect to home page', () => {
    cy.visit('/login');
    cy.get('[data-test-id="signup-link"]').click();
    cy.url().should('include', '/signup');
    cy.title().should('include', 'Sign up');
    cy.reload();
    cy.title().should('include', 'Sign up');
    cy.get('input[name="name"]').type(faker.name.fullName());
    cy.get('input[type="email"]').type(faker.internet.email());
    cy.get('input[type="password"]').type(faker.internet.password());
    cy.get('form').submit();
    cy.url().should('include', '/');
  });
});
