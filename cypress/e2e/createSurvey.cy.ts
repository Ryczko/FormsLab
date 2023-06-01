import { faker } from '@faker-js/faker';

describe('Create Survey Page', () => {
  beforeEach(() => cy.clearIndexedDB());

  it('should redirect to login page when user is not logged in', () => {
    cy.visit('/survey/create');
    cy.url().should('include', '/login');
  });

  it('should create a survey', () => {
    const surveyTitle = faker.lorem.sentence();
    cy.login();
    cy.visit('/');
    cy.get('[data-test-id="create-survey"]').click();
    cy.url().should('include', '/survey/create');
    cy.get('[data-test-id="loading"]').should('not.be.visible');
    cy.get('input[name="survey-title"]').type(surveyTitle);
    cy.get('button[name="create-survey"]').click();
    cy.url().should('match', /\/survey\/answer\/.*/);
    cy.visit('/surveys');
    cy.get('[data-test-id="loading"]').should('not.be.visible');
    cy.contains(surveyTitle);
  });
});
