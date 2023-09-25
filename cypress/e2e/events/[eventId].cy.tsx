import { pastEvents } from '~fixtures/events'
import { eventUrl } from '~helpers/urls'

describe('events/{eventId}', () => {
  it('should render event', () => {
    cy.visit(eventUrl(pastEvents[0].status, pastEvents[0].id))
    cy.findAllByRole('row').should('have.length.gt', 0)
  })
})
