/// <reference types="cypress" />

declare namespace Cypress {
    type RuleTypeRT = 'realtime';
    type RuleTypeSliding = 'sliding';
    type RuleTypeHopping = 'hopping';
    type RuleType = RuleTypeRT | RuleTypeSliding | RuleTypeHopping;

    export type EventType = { id: string; name: string; url: string };
    export type Target = { id?: string; name: string; url: string };
    export type Rule = {
        id?: string;
        name: string;
        eventTypeId: string;
        targetId: string;
        type: RuleType;
    };

    interface Chainable<Subject> {
        // Assert Local Storage
        assertApiKey(apikey: string): Chainable<Subject>;
        // Save Apikey
        registerApikey(apikey: string): Chainable<Subject>;
        // Delete ApiKey
        deleteApikey(): Chainable<Subject>;

        // Visit Create Rule
        visitCreateRule(type: RuleType): Chainable<Subject>;

        // CRUD Event Types
        createEventType(name: string, apiKey: string): Chainable<EventType>;
        deleteEventType(id: string, apiKey: string): Chainable<unknown>;

        // CRUD Targets
        createTarget(target: Target, apiKey: string): Chainable<Target>;
        deleteTarget(id: string, apiKey: string): Chainable<unknown>;

        // CRUD Rules
        createRule(rule: Rule, apiKey: string): Chainable<Rule>;
        deleteRule(id: string, apiKey: string): Chainable<unknown>;

        // Visit sections
        visitEventTypes(): Chainable<Subject>;
        visitTargets(): Chainable<Subject>;
    }
}
