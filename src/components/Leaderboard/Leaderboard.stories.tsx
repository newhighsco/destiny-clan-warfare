import { company } from '@fixtures/clans'
import Leaderboard from '.'

export default { component: Leaderboard }

export const Source = { args: { rows: [], columns: [] } }

const clans = [...new Array(50)].map((_, index) => ({
  ...company,
  rank: index + 1,
  active: 50,
  size: 100,
  score: 1000
}))

export const WithClans = {
  args: { height: 300, rows: clans, columns: ['active', 'size', 'score'] }
}
