import { faker } from '@faker-js/faker';

describe('Creating survey tests', () => {
  it('should create a survey', () => {
    const surveyTitle = faker.lorem.sentence();
    const questionContent = faker.lorem.sentence();

    cy.login();
    cy.get('[data-test-id="create-survey"]').click();
    cy.url().should('include', '/survey/create');

    cy.get('[data-test-id="start-from-scratch-field"]').click();
    cy.get('[data-test-id="start-from-scratch-button"]').click();
    cy.get('[data-test-id="add-question-button"]').click();
    cy.get('[data-test-id="emoji-question-button"]').click();
    cy.get('[data-test-id="add-question-button"]').click();
    cy.get('[data-test-id="input-question-button"]').click();

    cy.get('input[name="survey-title"]').clear().type(surveyTitle);

    cy.get('input[data-test-id="question-input-0"]')
      .clear()
      .type(questionContent);

    cy.get('input[data-test-id="question-input-1"]')
      .clear()
      .type(questionContent);

    cy.get('button[name="create-survey"]').click();

    cy.url().should('include', '/survey/answer/');
    cy.visit('/surveys');
    cy.contains(surveyTitle);
  });
});
