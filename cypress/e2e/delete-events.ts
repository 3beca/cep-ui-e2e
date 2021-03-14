import { apiKey } from '../support/data';

describe('Delete Events section', () => {
    beforeEach(() => {
        cy.registerApikey(apiKey);
    });

    afterEach(() => {
        cy.deleteApikey();
    });

    it('should delete one event', () => {
        cy.createEventType('EventtoDelete', apiKey);
        cy.visitEventTypes();
        cy.findByLabelText('element name');
        cy.findByLabelText('delete one icon').click();
        cy.findByLabelText('delete button').click();
        cy.findByLabelText('element name', { timeout: 300 }).should(
            'not.exist'
        );
    });

    it('should delete all events in a page', () => {
        cy.createEventType('EventtoDelete One', apiKey);
        cy.createEventType('EventtoDelete Two', apiKey);
        cy.createEventType('EventtoDelete Three', apiKey);

        cy.visitEventTypes();
        cy.findAllByLabelText('element name').should('have.length', 3);
        cy.findByLabelText('element-selector-all').click();
        cy.findByLabelText('delete selecteds icon').click();
        cy.findByLabelText('delete button').click();
        cy.findByLabelText('close button').click();
        cy.findByLabelText('element name', { timeout: 300 }).should(
            'not.exist'
        );
    });
});
