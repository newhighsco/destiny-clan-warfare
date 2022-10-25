import { company } from '@fixtures/clans'
import { Status } from '@libs/api/types'
import Clan from '.'

export default { component: Clan }

export const Source = { parameters: { chromatic: { disable: true } } }

export const Overall = { args: { ...company } }

export const Current = {
  args: {
    ...company,
    status: Status[Status.Running],
    description: null
  }
}
