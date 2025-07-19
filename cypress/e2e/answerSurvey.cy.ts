import { faker } from '@faker-js/faker';

describe('Answering survey tests', () => {
  it('should create a survey, answer it and show thank you page', () => {
    // Login before proceeding
    cy.login();

    // Create Survey
    const surveyTitle = faker.lorem.sentence();
    const questionContent = faker.lorem.sentence();

    cy.get('[data-test-id="create-survey"]').click();
    cy.url().should('include', '/survey/create');
    cy.get('[data-test-id="expand-templates"]').click();
    cy.get('[data-test-id="start-from-scratch-field"]').click();
    cy.get('[data-test-id="confirm-template-change"]').click();
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
      cy.get('[data-test-id="thank-you-header"]').should('exist');
    });
  });
});
