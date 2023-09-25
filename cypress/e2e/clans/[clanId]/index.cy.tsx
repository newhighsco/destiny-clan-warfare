import { company } from '~fixtures/clans'
import { clanUrl } from '~helpers/urls'

describe('clans/{clanId}', () => {
  it('should render clan', () => {
    cy.visit(clanUrl(company.id))
    cy.findByRole('heading', { name: 'Avalanche UK' }).should('exist')
    cy.findAllByRole('row').should('have.length.gt', 0)
  })
})
