import { company } from '~fixtures/clans'
import { member } from '~fixtures/members'
import { clanUrl } from '~helpers/urls'

describe('clans/{clanId}/{memberId}', () => {
  it('should render member', () => {
    cy.visit(clanUrl(company.id, member.membershipId))
  })
})
