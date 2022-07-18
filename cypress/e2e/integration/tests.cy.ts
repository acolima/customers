/// <reference types="cypress" />
// @ts-check

describe('Customers', () => {
	const customer = {
		name: 'Caroline Oliveira',
		email: 'anacdolima@gmail.com',
		phoneNumbers: [
			{ number: '19999999999', type: 'home' },
			{ number: '29999999999', type: 'home' },
		],
	};

	before(() => {
		cy.request('POST', 'http://localhost:5000/e2e/truncate', {});
	});

	it('should add a new customer', () => {
		cy.visit('http://localhost:3000');

		cy.get('#add-customer-button').click();
		cy.contains('Novo Contato').should('be.visible');

		cy.get('#customer-name-input').type(customer.name);
		cy.get('#customer-email-input').type(customer.email);
		cy.get('#customer-phone1-input').type(customer.phoneNumbers[0].number);
		cy.get('#customer-phone2-input').type(customer.phoneNumbers[1].number);

		cy.intercept('POST', 'http://localhost:5000/customers');

		cy.get('#save-customer-button').click();

		cy.wait(500);

		cy.contains(customer.name).should('be.visible');
	});

	it('should edit customer informations', () => {
		const newName = 'Ana Caroline';

		cy.visit('http://localhost:3000');

		cy.get('#customer-container').click();
		cy.get('#edit-button').click();
		cy.contains('Editar Contato').should('be.visible');

		cy.get('#customer-name-input').clear();
		cy.get('#customer-name-input').type(newName);

		cy.intercept('PUT', 'http://localhost:5000/customers');

		cy.get('#save-customer-button').click();

		cy.wait(500);

		cy.contains(newName).should('be.visible');
	});

	it('should delete customer', () => {
		cy.visit('http://localhost:3000');

		cy.get('#customer-container').click();
		cy.get('#delete-button').click();
		cy.contains('Deseja apagar esse contato?').should('be.visible');

		cy.intercept('DELETE', 'http://localhost:5000/customers');

		cy.get('#confirm-delete-button').click();

		cy.wait(500);

		cy.contains('Nenhum contato adicionado').should('be.visible');
	});
});
