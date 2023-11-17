describe('Navigation', () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it('should contain the information of the repository', () => {
    cy.contains("take-home-test");
    cy.contains("Monorepo showcasing a take-home test project using Next.js for the frontend and Nest.js for the backend");
    cy.contains("danpvlz");
  })

  it('should render commit cards', () => {
    cy.get('[data-cy="commit-card"]').should('have.length.gte', 5)
  })

  it('should ensure the repository card is at left of commit cards in desktop view', () => {
    cy.get('[data-cy="repository-card"]').as('repositoryCard');
    cy.get('[data-cy="commit-card"]').as('commitCard');

    cy.get('@commitCard').invoke('offset').then((commitCardOffset) => {
      cy.get('@repositoryCard').invoke('offset').then((repositoryCardOffset) => {
        expect(commitCardOffset?.left).to.be.greaterThan(repositoryCardOffset?.left || 0);
      });
    });
  });

  it('should ensure the repository card is above commit cards in mobile view', () => {
    cy.viewport('iphone-6');

    cy.get('[data-cy="repository-card"]').as('repositoryCard');
    cy.get('[data-cy="commit-card"]').as('commitCard');

    cy.get('@commitCard').invoke('offset').then((commitCardOffset) => {
      cy.get('@repositoryCard').invoke('offset').then((repositoryCardOffset) => {
        expect(commitCardOffset?.top).to.be.greaterThan(repositoryCardOffset?.top || 0);
      });
    });
  });
})