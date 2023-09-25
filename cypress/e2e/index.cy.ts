describe('index', () => {
  it('should render events', () => {
    cy.visit('/')
    cy.findAllByRole('heading', { level: 2 }).should('have.length.gt', 0)
    cy.findByRole('link', { name: 'View all events' }).should('exist')
  })
})
