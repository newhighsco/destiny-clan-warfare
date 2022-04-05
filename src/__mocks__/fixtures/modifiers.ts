import { Modifier } from '@libs/api/types'

export const eventModifiers = [
  {
    name: 'Pulsating',
    description: 'Get bonus points for pulse rifle kills',
    scoringModifier: true,
    scoringBonus: 100
  },
  {
    name: 'Show Some Mercy!',
    description: 'Win a game by mercy ruling and get a bonus 3000 points!',
    scoringModifier: true,
    scoringBonus: 3000
  },
  {
    name: 'Band Together',
    description:
      'Get an increased multiplier for playing with members of your clan (stacks)',
    multiplierBonus: 0.5
  }
] as Modifier[]
