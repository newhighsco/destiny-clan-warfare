import { company } from '~fixtures/clans'
import { member } from '~fixtures/members'
import { clanUrl } from '~helpers/urls'

describe('clans/{clanId}/{memberId}', () => {
  it('should render member', () => {
    cy.visit(clanUrl(company.id, member.membershipId))
    cy.findByRole('heading', { name: member.name }).should('exist')
    cy.findByRole('link', { name: company.name }).should('exist')
  })
})
