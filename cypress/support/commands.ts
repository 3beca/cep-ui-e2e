import { VERSION, RULES, EVENT_TYPES, TARGETS } from './data';

Cypress.Commands.add('assertApiKey', (apikeyValue: string) => {
    cy.window().its('localStorage.APIKEY').should('eq', apikeyValue);
});

Cypress.Commands.add('registerApikey', (apikeyValue: string) => {
    cy.request({
        url: VERSION,
        method: 'GET',
        failOnStatusCode: false
    }).then(response => {
        console.log('Response', response);
        expect(response.status).eq(401);
        window.localStorage.setItem('APIKEY', apikeyValue);
        cy.assertApiKey(apikeyValue);
    });
});

Cypress.Commands.add('deleteApikey', () => {
    window.localStorage.removeItem('APIKEY');
    cy.window().its('localStorage.APIKEY').should('eq', undefined);
});

Cypress.Commands.add('visitCreateRule', (type: Cypress.RuleType) => {
    cy.visit('/');
    cy.findByLabelText(/add rule/i).click();
    cy.findByTestId(`create ${type} card`).click();
    cy.findByLabelText(/select button/i)
        .click()
        .url()
        .should('eq', `${Cypress.config().baseUrl}/rules/create/${type}`);
    cy.findByLabelText(/payload creator info message no eventTypeId/i).should(
        'have.text',
        'When you choose an EventType you can download or create its payload, in order to create a custom filter for your Rule'
    );
});

Cypress.Commands.add('deleteRule', (id: string, apiKey: string) => {
    cy.request({
        url: RULES + id,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    });
});

Cypress.Commands.add('deleteEventType', (id: string, apiKey: string) => {
    cy.request({
        url: EVENT_TYPES + id,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    });
});

Cypress.Commands.add('deleteTarget', (id: string, apiKey: string) => {
    cy.request({
        url: TARGETS + id,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    });
});

Cypress.Commands.add('createEventType', (name: string, apiKey: string) => {
    cy.request({
        url: EVENT_TYPES,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`
        },
        body: { name }
    }).then(response => {
        console.log('Response EventType', response);
        return response.body;
    });
});

Cypress.Commands.add(
    'createTarget',
    (target: Cypress.Target, apiKey: string) => {
        cy.request({
            url: TARGETS,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`
            },
            body: target
        }).then(response => {
            console.log('Response Target', response);
            return response.body;
        });
    }
);

Cypress.Commands.add('createRule', (rule: Cypress.Rule, apiKey: string) => {
    cy.request({
        url: RULES,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`
        },
        body: rule
    }).then(response => {
        console.log('Response Rule', response);
        return response.body;
    });
});

Cypress.Commands.add('visitEventTypes', () => {
    cy.visit('/');
    cy.findByLabelText('toggle show menu').click();
    cy.findByText('Event Types').click();
});

Cypress.Commands.add('visitTargets', () => {
    cy.visit('/');
    cy.findByLabelText('toggle show menu').click();
    cy.findByText('Targets').click();
});
