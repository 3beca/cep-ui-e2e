import { apiKey } from '../support/data';

describe('Delete Targets section', () => {
    beforeEach(() => {
        cy.registerApikey(apiKey);
    });

    afterEach(() => {
        cy.deleteApikey();
    });

    it('should delete one target', () => {
        cy.createTarget(
            { name: 'Target to Delete', url: 'http://centic.es' },
            apiKey
        );
        cy.visitTargets();
        cy.findByLabelText('element name');
        cy.findByLabelText('delete one icon').click();
        cy.findByLabelText('delete button').click();
        cy.findByLabelText('element name', { timeout: 300 }).should(
            'not.exist'
        );
    });

    it('should delete all targets in a page', () => {
        cy.createTarget(
            { name: 'Target to Delete 1', url: 'http://centic.es' },
            apiKey
        );
        cy.createTarget(
            { name: 'Target to Delete 2', url: 'http://centic.es' },
            apiKey
        );
        cy.createTarget(
            { name: 'Target to Delete 3', url: 'http://centic.es' },
            apiKey
        );

        cy.visitTargets();
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
