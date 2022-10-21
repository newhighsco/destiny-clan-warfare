import Clan from '@components/Clan'
import { company } from '@fixtures/clans'
import { Status } from '@libs/api/types'

export default { component: Clan }

export const Source = { parameters: { chromatic: { disable: true } } }

export const Overall = { args: { ...company } }

export const Current = {
  args: {
    ...company,
    status: Status[Status.Running],
    description: null,
    stats: [
      { name: 'Total active', value: 100 },
      { name: 'Total games', value: 1000 },
      { name: 'Bonus 1', value: 1000 },
      { name: 'Bonus 2', value: 1000 }
    ]
  }
}
