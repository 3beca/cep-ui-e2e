/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { apiKey } from '../support/data';

describe('Create Rules section', () => {
    beforeEach(() => {
        cy.registerApikey(apiKey);
    });

    afterEach(() => {
        cy.deleteApikey();
    });

    it('should create a new Real Time rule passthrow', () => {
        cy.visitCreateRule('realtime');
        const ruleName = 'First rule';
        cy.findByLabelText('rule creator name').type(ruleName);

        const eventName = 'First Event Name';
        cy.findByLabelText('Search a Eventtype').type(eventName);

        cy.intercept('POST', '/event-types').as('new-event');
        let eventId: string | null = null;
        cy.findByText(`Create ${eventName}`).click();
        cy.wait('@new-event').then(subject => {
            const body = subject.response?.body;
            eventId = body?.id;
            console.log('New Event2', eventId);
        });

        const targetName = 'First Target';
        const targetUrl = 'http://api.telegram.centic.ovh';
        cy.findByLabelText('Search a Target').type(targetName);
        cy.intercept('POST', '/targets').as('new-target');
        let targetId: string | null = null;
        cy.findByText(`Create ${targetName}`).click();
        cy.findByLabelText('target creating input url').type(targetUrl);
        cy.findByLabelText('target creating button url').click();
        cy.wait('@new-target').then(subject => {
            const body = subject.response?.body;
            targetId = body?.id;
            console.log('New Target2', targetId);
        });

        cy.intercept('POST', '/rules').as('new-rule');
        cy.findByLabelText('rule create button').click();
        cy.findByLabelText('rule create success button details').click();
        let ruleId: string | null = null;
        cy.wait('@new-rule').then(subject => {
            const body = subject.response?.body;
            ruleId = body?.id;
            console.log('New Rule', ruleId);
        });

        cy.location().then(url => {
            const sections = url.pathname.split('/');
            const expectedRuleId = sections[sections.length - 1];
            expect(expectedRuleId).equal(ruleId);

            // Delete data created for test
            console.log('Data created', ruleId, eventId, targetId);
            cy.deleteRule(ruleId as string, apiKey);
            cy.deleteEventType(eventId as string, apiKey);
            cy.deleteTarget(targetId as string, apiKey);
        });
    });

    it('should create a new Real Time rule filtered', () => {
        const eventName = 'First Event Filtered';
        let event: Cypress.EventType | null = null;
        cy.createEventType(eventName, apiKey).then(eventReceived => {
            event = eventReceived;
        });
        let target: Cypress.Target = {
            name: 'first Target filtered',
            url: 'http://telegram.centicovh'
        };
        cy.createTarget(target, apiKey).then(targetReceived => {
            target = targetReceived;
        });

        cy.visitCreateRule('realtime');
        const ruleName = 'First rule filtered';
        cy.findByLabelText('rule creator name').type(ruleName);

        cy.findByLabelText('Search a Eventtype').type(eventName);
        cy.findByText(`${eventName}`).click();

        const targetName = target.name;
        cy.findByLabelText('Search a Target').type(targetName);
        cy.findByText(`${targetName}`).click();

        cy.findByLabelText('payload addfield button open dialog').click();
        cy.findByLabelText('payload addfield dialog name').type('temperature');
        cy.findByLabelText('payload addfield dialog number').click();
        cy.findByLabelText('payload addfield dialog add').click();
        cy.findByLabelText('payload addfield dialog close').click();

        cy.findByLabelText('filter add button expression').click();
        cy.findByLabelText('config filter field selector').click();
        cy.findAllByLabelText('config filter options').then(subject => {
            subject[0].click();
        });
        cy.findByLabelText('config filter operator selector').click();
        cy.findAllByLabelText('config filter operators').then(subject => {
            subject[3].click();
        });
        cy.findByLabelText('config filter value').type('0');
        cy.findByLabelText('config filter button save').click();

        cy.intercept('POST', '/rules').as('new-rule');
        cy.findByLabelText('rule create button').click();
        cy.findByLabelText('rule create success button details').click();

        let ruleId: string | null = null;
        cy.wait('@new-rule').then(subject => {
            const body = subject.response?.body;
            ruleId = body?.id;
            console.log('New Rule', ruleId);
        });

        cy.location().then(url => {
            const sections = url.pathname.split('/');
            const expectedRuleId = sections[sections.length - 1];
            expect(expectedRuleId).equal(ruleId);

            // Delete data created for test
            cy.deleteRule(ruleId as string, apiKey);
            cy.deleteEventType(event?.id as string, apiKey);
            cy.deleteTarget(target.id as string, apiKey);
        });
    });
});
