import { pastEvent } from '~fixtures/events'
import { eventUrl } from '~helpers/urls'

describe('events/{eventId}', () => {
  it('should render event', () => {
    cy.visit(eventUrl(pastEvent))
    cy.findAllByRole('row').should('have.length.gt', 0)
  })
})
