import { faker } from '@faker-js/faker';

describe('Create and Answer Survey', () => {
  it('should create a survey and answer it and show thank you page', () => {
    // Login before proceeding
    cy.login();

    // Create Survey
    const surveyTitle = faker.lorem.sentence();
    const questionContent = faker.lorem.sentence();

    cy.get('[data-test-id="create-survey"]').click();
    cy.url().should('include', '/survey/create');
    cy.get('input[name="survey-title"]').type(surveyTitle);

    cy.get('input[data-test-id="question-input-0"]').type(questionContent);
    cy.get('input[data-test-id="question-input-1"]').type(questionContent);

    cy.get('button[data-test-id="options-button"]').click();
    cy.get('[data-test-id="one-per-step-toggle"]').click();
    cy.get('[data-test-id="close-modal"]').click();
    cy.get('button[name="create-survey"]').click();

    // Extract and visit the Answer Survey URL
    cy.url().should('include', '/survey/answer/');
    cy.url().then((currentUrl) => {
      const urlParts = currentUrl.split('/');
      const domain = urlParts.slice(0, 3).join('/');
      const surveyId = urlParts.pop();
      const newUrl = `${domain}/survey/${surveyId}`;

      cy.visit(newUrl);

      // Answer Survey
      cy.get('button:has(em-emoji[shortcodes=":smiley:"])')
        .should('be.visible')
        .should('be.enabled')
        .click();
      cy.get('input[placeholder="Answer..."]')
        .should('be.visible')
        .type('test');
      cy.contains('button', 'Send').should('be.visible').click();

      // Verify Thank You Page
      cy.url().should('include', '/thank-you');
    });
  });
});
