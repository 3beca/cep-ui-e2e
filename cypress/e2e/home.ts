import { apiKey } from '../support/data';

describe('Home page', () => {
    it('should open navigator and login with apikey', () => {
        cy.visit('/');
        cy.findByTestId('login input').type(apiKey);
        cy.findByText(/submit api key/i).click();
        cy.findByLabelText(/add rule/i);
    });

    it('should open navigator and fails login with invalid apikey', () => {
        cy.visit('/');
        cy.findByTestId('login input').type('invalid api key');
        cy.findByText(/submit api key/i).click();
        cy.findByLabelText(/login reason/i).should(
            'have.text',
            'ApiKey invalid api key is NOT valid'
        );
    });

    it('should navigate to create RT rule', () => {
        cy.registerApikey(apiKey);
        cy.visit('/');
        cy.findByLabelText(/add rule/i).click();
        cy.findByLabelText(/create rule real time card/i).click();
        cy.findByLabelText(/select button/i)
            .click()
            .url()
            .should('eq', `${Cypress.config().baseUrl}/rules/create/realtime`);
        cy.findByLabelText(
            /payload creator info message no eventTypeId/i
        ).should(
            'have.text',
            'When you choose an EventType you can download or create its payload, in order to create a custom filter for your Rule'
        );
        cy.screenshot();
    });

    it('should navigate to create Sliding rule', () => {
        cy.registerApikey(apiKey);
        cy.visit('/');
        cy.findByLabelText(/add rule/i).click();
        cy.findByLabelText(/create rule sliding card/i).click();
        cy.findByLabelText(/select button/i)
            .click()
            .url()
            .should('eq', `${Cypress.config().baseUrl}/rules/create/sliding`);
        cy.findByLabelText(
            /payload creator info message no eventTypeId/i
        ).should(
            'have.text',
            'When you choose an EventType you can download or create its payload, in order to create a custom filter for your Rule'
        );
        cy.screenshot();
    });

    it('should navigate to create Hopping rule', () => {
        cy.registerApikey(apiKey);
        cy.visit('/');
        cy.findByLabelText(/add rule/i).click();
        cy.findByLabelText(/create rule hopping card/i).click();
        cy.findByLabelText(/select button/i)
            .click()
            .url()
            .should('eq', `${Cypress.config().baseUrl}/rules/create/hopping`);
        cy.findByLabelText(
            /payload creator info message no eventTypeId/i
        ).should(
            'have.text',
            'When you choose an EventType you can download or create its payload, in order to create a custom filter for your Rule'
        );
        cy.screenshot();
    });
});
