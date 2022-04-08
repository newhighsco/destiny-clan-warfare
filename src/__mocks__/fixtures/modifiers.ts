import { Modifier } from '@libs/api/types'

export const eventModifiers = [
  {
    name: 'Pulsating',
    shortName: 'Pulse',
    description: 'Get bonus points for pulse rifle kills',
    scoringModifier: true,
    multiplierModifier: false,
    scoringBonus: 100,
    multiplierBonus: 0
  },
  {
    name: 'Show Some Mercy!',
    shortName: 'Mercy',
    description: 'Win a game by mercy ruling and get a bonus 3000 points!',
    scoringModifier: true,
    multiplierModifier: false,
    scoringBonus: 3000,
    multiplierBonus: 0
  },
  {
    name: 'Band Together',
    shortName: 'Band',
    description:
      'Get an increased multiplier for playing with members of your clan (stacks)',
    scoringModifier: false,
    multiplierModifier: true,
    scoringBonus: 0,
    multiplierBonus: 0.5
  }
] as Modifier[]
