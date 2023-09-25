import { eventUrl } from '~helpers/urls'

describe('events', () => {
  it('should render events', () => {
    cy.visit(eventUrl())
    cy.findAllByRole('row').should('have.length.gt', 0)
  })
})
