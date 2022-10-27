import { leaderboard as clans } from '@fixtures/clans'
import { leaderboard as members } from '@fixtures/members'
import Leaderboard from '.'

export default {
  component: Leaderboard,
  parameters: { backgrounds: { default: 'dark' } }
}

export const Source = { args: { rows: [], columns: [] } }

export const WithClans = {
  args: {
    rows: clans,
    columns: ['active', 'size', 'score'],
    setHref: ({ id }) => ['#', id].join('')
  }
}

export const WithMembers = {
  args: {
    ...WithClans.args,
    rows: members,
    columns: ['wins', 'kills', 'assists', 'deaths', 'score']
  }
}

const columns = [...new Array(15)].map((_, i) => `Column ${i}`)
const rows = [...new Array(50)].map((_, i) => {
  const row = members[i]

  columns.forEach((column, i) => (row[column] = 100 * (i + 1) * row.rank))

  return row
})

export const WithWrapping = {
  args: { ...WithClans.args, rows, columns }
}
