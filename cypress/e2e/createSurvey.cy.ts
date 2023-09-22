import { faker } from '@faker-js/faker';

describe('Create Survey Page', () => {
  it('should create a survey', () => {
    const surveyTitle = faker.lorem.sentence();
    const questionContent = faker.lorem.sentence();

    cy.login();
    cy.get('[data-test-id="create-survey"]').click();
    cy.url().should('include', '/survey/create');
    cy.get('input[name="survey-title"]').type(surveyTitle);

    cy.get('input[data-test-id="question-input-0"]').type(questionContent);
    cy.get('input[data-test-id="question-input-1"]').type(questionContent);

    cy.get('button[name="create-survey"]').click();

    console.log('url', cy.url());
    cy.url().should('include', '/survey/answer/');
    cy.visit('/surveys');
    cy.contains(surveyTitle);
  });
});
