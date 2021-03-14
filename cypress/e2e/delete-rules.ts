import { apiKey } from '../support/data';

function prepareRule(
    name: string,
    eventTypeId: string,
    targetId: string,
    type: Cypress.RuleType = 'realtime'
): Cypress.Rule {
    return { name, type, eventTypeId, targetId };
}

describe('Delete Rules section', () => {
    let event: Cypress.EventType, target: Cypress.Target;
    beforeEach(() => {
        cy.registerApikey(apiKey);
        cy.createEventType('Event to delete', apiKey).then(eventReceived => {
            event = eventReceived;
        });
        cy.createTarget(
            { name: 'Target to delete', url: 'http://telegram.centic.ovh' },
            apiKey
        ).then(targetReceived => {
            target = targetReceived;
        });
    });

    afterEach(() => {
        cy.deleteApikey();
        cy.deleteEventType(event.id, apiKey);
        cy.deleteTarget(target.id!, apiKey);
    });

    it('should delete an existing rule', () => {
        const newRule = prepareRule('Rule to delete', event.id, target.id!);
        cy.createRule(newRule, apiKey);
        cy.visit('/');
        cy.findByLabelText('element card rule')
            .should('have.length.at.least', 1)
            .and('have.length.at.most', 10);
        cy.findByLabelText('settings card rule').click();
        cy.findByLabelText('setting dialog delete card rule').click();
        cy.findByLabelText('delete button').click();
        cy.findByLabelText('element card rule', { timeout: 300 }).should(
            'not.exist'
        );
    });
});
