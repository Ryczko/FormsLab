import { faker } from '@faker-js/faker';

describe('Create Survey Page', () => {
  it('should redirect to login page when user is not logged in', () => {
    cy.visit('/survey/create');
    cy.url().should('include', '/login');
  });

  it('should create a survey with one question per step and display title', () => {
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

  it('should create a survey with one question per step and not display title', () => {
    const surveyTitle = faker.lorem.sentence();
    const questionContent = faker.lorem.sentence();

    cy.login();
    cy.get('[data-test-id="create-survey"]').click();
    cy.url().should('include', '/survey/create');
    cy.get('input[name="survey-title"]').type(surveyTitle);

    cy.get('[data-test-id="options-button"]').click();
    cy.get('[data-test-id="display-title-toggle"]').click();
    cy.get('[data-test-id="close-modal"]').click();

    cy.get('input[data-test-id="question-input-0"]').type(questionContent);
    cy.get('input[data-test-id="question-input-1"]').type(questionContent);

    cy.get('button[name="create-survey"]').click();

    console.log('url', cy.url());
    cy.url().should('include', '/survey/answer/');
    cy.visit('/surveys');
    cy.contains(surveyTitle);
  });

  it('should create a survey with all questions displayed and display title', () => {
    const surveyTitle = faker.lorem.sentence();
    const questionContent = faker.lorem.sentence();

    cy.login();
    cy.get('[data-test-id="create-survey"]').click();
    cy.url().should('include', '/survey/create');
    cy.get('input[name="survey-title"]').type(surveyTitle);

    cy.get('[data-test-id="options-button"]').click();
    cy.get('[data-test-id="one-per-step-toggle"]').click();
    cy.get('[data-test-id="close-modal"]').click();

    cy.get('input[data-test-id="question-input-0"]').type(questionContent);
    cy.get('input[data-test-id="question-input-1"]').type(questionContent);

    cy.get('button[name="create-survey"]').click();

    console.log('url', cy.url());
    cy.url().should('include', '/survey/answer/');
    cy.visit('/surveys');
    cy.contains(surveyTitle);
  });

  it('should create a survey with all questions displayed and not display title', () => {
    const surveyTitle = faker.lorem.sentence();
    const questionContent = faker.lorem.sentence();

    cy.login();
    cy.get('[data-test-id="create-survey"]').click();
    cy.url().should('include', '/survey/create');
    cy.get('input[name="survey-title"]').type(surveyTitle);

    cy.get('[data-test-id="options-button"]').click();
    cy.get('[data-test-id="one-per-step-toggle"]').click();
    cy.get('[data-test-id="display-title-toggle"]').click();
    cy.get('[data-test-id="close-modal"]').click();

    cy.get('input[data-test-id="question-input-0"]').type(questionContent);
    cy.get('input[data-test-id="question-input-1"]').type(questionContent);

    cy.get('button[name="create-survey"]').click();

    console.log('url', cy.url());
    cy.url().should('include', '/survey/answer/');
    cy.visit('/surveys');
    cy.contains(surveyTitle);
  });
});