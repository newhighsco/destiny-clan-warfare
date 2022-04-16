import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { styled } from '@storybook/theming'
import { Modifier, ModifierList } from '@components/Modifier'

export default {
  title: 'Components/Modifier',
  component: Modifier
} as ComponentMeta<typeof Modifier>

const Template: ComponentStory<typeof Modifier> = args => <Modifier {...args} />

export const Source = Template.bind({})

Source.parameters = {
  chromatic: { disable: true }
}

const ListTemplate: ComponentStory<typeof ModifierList> = args => (
  <ModifierList {...args} />
)

export const List = ListTemplate.bind({})

List.args = {
  modifiers: [
    { name: '20/20' },
    { name: '20/20', multiplierBonus: 100 },
    { name: '20/20', multiplierBonus: 0 },
    { name: '20/20', multiplierBonus: 0.1 },
    { name: '20/20', scoringBonus: 0, scoringModifier: true },
    { name: '20/20', scoringBonus: 50, scoringModifier: true },
    { name: '20/20', scoringBonus: -50, scoringModifier: true },
    { name: 'Nonexistent' },
    { name: 'Nonexistent', multiplierBonus: 100 },
    { name: 'Nonexistent', multiplierBonus: 0 },
    { name: 'Nonexistent', multiplierBonus: 0.1 },
    { name: 'Nonexistent', scoringBonus: 0, scoringModifier: true },
    { name: 'Nonexistent', scoringBonus: 50, scoringModifier: true },
    { name: 'Nonexistent', scoringBonus: -50, scoringModifier: true },
    { name: 'Modifier TBC', multiplierBonus: 0 },
    { name: 'Multiplier TBC', scoringBonus: 0, scoringModifier: true },
    { name: 'No Modifier', multiplierBonus: 0 },
    {
      name: 'No Multiplier',
      scoringBonus: 0,
      scoringModifier: true
    }
  ]
}

export const All = ListTemplate.bind({})

All.args = {
  modifiers: [
    {
      id: 1,
      multiplierBonus: 0,
      scoringBonus: 50,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Doubles',
      createdBy: '',
      description: 'Get double kills for bonus points',
      name: 'Double Down'
    },
    {
      id: 2,
      multiplierBonus: 0,
      scoringBonus: 50,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Sprees',
      createdBy: '',
      description: 'Get bonus points for each 5x killing spree',
      name: 'Merciless'
    },
    {
      id: 3,
      multiplierBonus: 0,
      scoringBonus: 50,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Precision',
      createdBy: '',
      description: 'Get bonus points for each precision kill',
      name: 'Bullseye'
    },
    {
      id: 4,
      multiplierBonus: 0.25,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Weapons',
      createdBy: '',
      description:
        'Get an increased multiplier for each different weapon you use',
      name: 'Variety is the Spice of Life'
    },
    {
      id: 5,
      multiplierBonus: 2,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Wins',
      createdBy: '',
      description: 'Double your score if your team wins',
      name: 'Winner Winner Chicken Dinner'
    },
    {
      id: 6,
      multiplierBonus: 0,
      scoringBonus: 50,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Sword',
      createdBy: '',
      description: 'Get bonus points for Sword kills',
      name: "Luke Skywalker's Padawan"
    },
    {
      id: 7,
      multiplierBonus: 3,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Flawless',
      createdBy: '',
      description:
        "Get your individual score tripled if you don't die during a Strike",
      name: 'Flawless Striker'
    },
    {
      id: 8,
      multiplierBonus: 0,
      scoringBonus: 25,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Melee',
      createdBy: '',
      description: 'Get bonus points for melee kills',
      name: "Rocky Balboa's Trainee"
    },
    {
      id: 9,
      multiplierBonus: 0,
      scoringBonus: 25,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Grenade',
      createdBy: '',
      description: 'Get bonus points for grenade kills',
      name: 'Nice Throw!'
    },
    {
      id: 10,
      multiplierBonus: 0,
      scoringBonus: -50,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Anti-meta',
      createdBy: '',
      description:
        "Lose 50 points for each kills obtained with either 'Uriel's Gift', 'Positive Outlook' or 'Antiope-D'",
      name: 'Anti-Meta'
    },
    {
      id: 11,
      multiplierBonus: 0.5,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Members',
      createdBy: '',
      description:
        'Get an increased multiplier for playing with members of your clan (stacks)',
      name: 'Band Together'
    },
    {
      id: 12,
      multiplierBonus: 0,
      scoringBonus: -450,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Deaths',
      createdBy: '',
      description: 'Deaths in a strike lose you 10x more points',
      name: 'Strike Death Penalty'
    },
    {
      id: 13,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Telesto',
      createdBy: '',
      description: 'Kills with ‘Telesto’ are worth double points',
      name: 'Telesto Festo'
    },
    {
      id: 14,
      multiplierBonus: 0,
      scoringBonus: 150,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Zones',
      createdBy: '',
      description: 'Get bonus points for each zone you capture',
      name: 'Zone Captured'
    },
    {
      id: 15,
      multiplierBonus: 0,
      scoringBonus: 150,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Doubles',
      createdBy: '',
      description: 'Get double kills in Crimson Days to earn buckets of points',
      name: 'Crimson Double Down'
    },
    {
      id: 16,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Pulse',
      createdBy: '4611686018438341498',
      description: 'Bonus points for precision kills with any Pulse Rifle',
      name: 'Pew Pew Pew'
    },
    {
      id: 17,
      multiplierBonus: 0,
      scoringBonus: -150,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Power',
      createdBy: '4611686018461409471',
      description:
        'Suffer a penalty and lose points for each kill with a Power weapon',
      name: 'Abuse of Power'
    },
    {
      id: 18,
      multiplierBonus: 3,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Perfect',
      createdBy: '',
      description:
        "In a round based game type, triple your score if you don't lose a single round",
      name: 'Perfection'
    },
    {
      id: 19,
      multiplierBonus: 0,
      scoringBonus: 50,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Raid',
      createdBy: '4611686018439820986',
      description: 'Bonus points for kills with a Raid weapon',
      name: 'Raid Master'
    },
    {
      id: 20,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Sniper',
      createdBy: '4611686018451680790',
      description: 'Bonus points for precision kills with a Sniper Rifle',
      name: '20/20'
    },
    {
      id: 21,
      multiplierBonus: 0,
      scoringBonus: 50,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Scout',
      createdBy: '4611686018440523199',
      description: 'Get bonus points for Scout Rifle kills',
      name: 'Boy Scout'
    },
    {
      id: 22,
      multiplierBonus: 0.1,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Frag',
      createdBy: '4611686018457363322',
      description: 'Get an extra 10% bonus for each grenade or melee kill',
      name: 'Frag and Tag'
    },
    {
      id: 23,
      multiplierBonus: 0,
      scoringBonus: -1000,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Supers',
      createdBy: '4611686018462681705',
      description: 'Suffer a penalty and lose points for any Super kill',
      name: 'Not So Super'
    },
    {
      id: 24,
      multiplierBonus: 0,
      scoringBonus: 150,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Supers',
      createdBy: '',
      description:
        "Bonus points for shutting down an enemy's Super using your own Super",
      name: 'Anything You Can Do'
    },
    {
      id: 25,
      multiplierBonus: 0,
      scoringBonus: 150,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Shutdown',
      createdBy: '4611686018448449716',
      description: 'Bonus points for ending an enemy kill-streak',
      name: 'Stop The Stopper'
    },
    {
      id: 26,
      multiplierBonus: 0,
      scoringBonus: -100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Auto',
      createdBy: '4611686018437148962',
      description:
        'Lose points off your total score for each kill with an Auto Rifle',
      name: 'Automatic Lockdown'
    },
    {
      id: 27,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Supers',
      createdBy: '4611686018431916280',
      description:
        'Bonus points for super kills with the new Destiny 2 supers (Sentinel, Dawnblade and Arcstrider)',
      name: 'Supers 2.0'
    },
    {
      id: 28,
      multiplierBonus: 0,
      scoringBonus: -50,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Anti-meta',
      createdBy: '',
      description:
        "Lose 50 points for each kills obtained with either 'Graviton Lance', 'Antiope-D' or 'Vigilance Wing'",
      name: 'Warmind Anti-meta'
    },
    {
      id: 29,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Doubles',
      createdBy: '',
      description: 'Bonus points foe earning a double kill medal in doubles',
      name: 'Doubles Double Down'
    },
    {
      id: 30,
      multiplierBonus: 0,
      scoringBonus: 200,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Power',
      createdBy: '',
      description: 'Kills with power weapons are worth 3x more',
      name: 'Power Hungry'
    },
    {
      id: 31,
      multiplierBonus: 0,
      scoringBonus: 400,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Supers',
      createdBy: '',
      description: 'Kills with supers are worth 5x more',
      name: 'Be a Superhero'
    },
    {
      id: 32,
      multiplierBonus: 0,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Deaths',
      createdBy: '',
      description: 'Lose all your points if you die',
      name: 'Deathless'
    },
    {
      id: 33,
      multiplierBonus: 0,
      scoringBonus: 1000,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Flag',
      createdBy: '',
      description:
        'Earn the "Flagbearer" medal which is awarded after a game for ending the match with the most combined Advantage and Power Play kills.',
      name: 'Flying the flag'
    },
    {
      id: 34,
      multiplierBonus: 0,
      scoringBonus: 200,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Sidearm',
      createdBy: '',
      description: 'Kills with sidearms are worth triple points',
      name: 'Always by your side'
    },
    {
      id: 35,
      multiplierBonus: 0.1,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Blues',
      createdBy: '',
      description:
        'Get an additional 10% boost for each kill with a rare (blue) weapon. Lose 10% for each kill with any other weapon (stacks)',
      name: 'Feeling Blue'
    },
    {
      id: 36,
      multiplierBonus: 2,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Accurate',
      createdBy: '',
      description:
        'Get your whole score doubled if you kill more enemies with precisions shots than body shots',
      name: 'Super Accurate'
    },
    {
      id: 37,
      multiplierBonus: 1,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Time',
      createdBy: '',
      description:
        'Your total score will be modified based on completion time. Please read the FAQs for more information',
      name: 'Raid Timing'
    },
    {
      id: 38,
      multiplierBonus: 0,
      scoringBonus: -50,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Exotic',
      createdBy: '4611686018433281155',
      description: 'All kills with exotic weapons are worth half points',
      name: 'Not very exotic'
    },
    {
      id: 39,
      multiplierBonus: 0,
      scoringBonus: -950,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Deaths',
      createdBy: '4611686018433281155',
      description: "Don't die! Each death loses you 1000 points!",
      name: 'I hit a rock'
    },
    {
      id: 40,
      multiplierBonus: 0,
      scoringBonus: 200,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'House',
      createdBy: '',
      description:
        'Bonus points each time you get the "I Live Here Now" medal which is awarded for holding two or more zones for at least 1 minute',
      name: 'This is my House'
    },
    {
      id: 41,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Meta',
      createdBy: '',
      description:
        "Bonus points for any kill with 'Vigilance Wing', 'Graviton Lance', or 'Colony'",
      name: 'No Apologies'
    },
    {
      id: 42,
      multiplierBonus: 0.5,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Efficient',
      createdBy: '',
      description:
        'Get an extra 50% boost for each each member of your fireteam that ends the match with either 1.0+ KD or 2.0+ efficiency',
      name: 'Helping Hand'
    },
    {
      id: 43,
      multiplierBonus: 0.5,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'KD',
      createdBy: '',
      description: 'Lose half your points if you have less than a 1.0 KD',
      name: "Efficiency isn't everything"
    },
    {
      id: 44,
      multiplierBonus: 1,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Time',
      createdBy: '',
      description: 'No timing modifier for this event',
      name: 'Take it easy'
    },
    {
      id: 45,
      multiplierBonus: 0,
      scoringBonus: 200,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Whisper',
      createdBy: '',
      description:
        'Bonus points if you use your new treasure - Whisper of the Worm',
      name: 'Hear the Whisper?'
    },
    {
      id: 46,
      multiplierBonus: 3,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Guided',
      createdBy: '',
      description:
        'Guided games earn triple points! Your total score will be modified based on completion time. Please read the FAQs for more information',
      name: 'Guided Games Raid Timing'
    },
    {
      id: 47,
      multiplierBonus: 0,
      scoringBonus: 0,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'N/A',
      createdBy: '',
      description: 'There is no bonus modifier active for this event',
      name: 'No Modifier'
    },
    {
      id: 48,
      multiplierBonus: 0,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'N/A',
      createdBy: '',
      description: 'There is no bonus modifier active for this event',
      name: 'No Multiplier'
    },
    {
      id: 49,
      multiplierBonus: 0,
      scoringBonus: 0,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'TBC',
      createdBy: '',
      description: 'Modifier not yet confirmed',
      name: 'Modifier TBC'
    },
    {
      id: 50,
      multiplierBonus: 0,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'TBC',
      createdBy: '',
      description: 'Multiplier not yet confirmed',
      name: 'Multiplier TBC'
    },
    {
      id: 51,
      multiplierBonus: 0,
      scoringBonus: 50,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Banked',
      createdBy: '',
      description: 'Get bonus points for each mote you bank in Gambit',
      name: 'Making a Deposit'
    },
    {
      id: 52,
      multiplierBonus: 0,
      scoringBonus: 1000,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Invaders',
      createdBy: '',
      description: 'Get large bonus points for each invader you kill',
      name: "Oh no you don't"
    },
    {
      id: 53,
      multiplierBonus: 2,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Primeval',
      createdBy: '',
      description: 'Double your score if you do most damage to your primeval',
      name: 'Let me handle this'
    },
    {
      id: 54,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Ace',
      createdBy: '',
      description: 'Get bonus points for kills using the Ace of Spades',
      name: 'Avenge Cayde-6'
    },
    {
      id: 55,
      multiplierBonus: 2,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Members',
      createdBy: '',
      description:
        'Earn double points if you win and at least one member of your team is in your clan',
      name: 'Make the dreamwork'
    },
    {
      id: 56,
      multiplierBonus: 0,
      scoringBonus: 1000,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Cycle',
      createdBy: '',
      description: "Earn loads of bonus points if you earn 'The Cycle' medal",
      name: 'Complete the cycle'
    },
    {
      id: 57,
      multiplierBonus: 3,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Sweep',
      createdBy: '',
      description: "Triple your score if you don't lose a round",
      name: 'Clean sweep'
    },
    {
      id: 58,
      multiplierBonus: 0,
      scoringBonus: 5000,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Blocker',
      createdBy: '',
      description:
        'Earn a load of bonus point if you call in at least 1 small, medium and large blocker',
      name: 'All Creatures Great & Small'
    },
    {
      id: 59,
      multiplierBonus: 0,
      scoringBonus: 25,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Ace',
      createdBy: '',
      description: 'Get bonus points for kills using the Ace of Spades',
      name: 'Avenge Cayde-6'
    },
    {
      id: 60,
      multiplierBonus: 0,
      scoringBonus: -100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Lost',
      createdBy: '4611686018433281155',
      description:
        'Lose points for each mote you hold if you die whilst holding them',
      name: "Oops, I'm trash"
    },
    {
      id: 61,
      multiplierBonus: 0,
      scoringBonus: 1000,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Blocker',
      createdBy: '4611686018433281155',
      description:
        'Gain a bunch of points each time you summon a large blocker',
      name: 'My motes bring all the boys to the yard'
    },
    {
      id: 62,
      multiplierBonus: 0.1,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Members',
      createdBy: '4611686018433281155',
      description:
        'Gain an extra 10% points boost for each clan member you play with',
      name: 'Chill at home'
    },
    {
      id: 63,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Bow',
      createdBy: '',
      description: 'Get bonus points for kills with a bow',
      name: 'Bow-ness points'
    },
    {
      id: 64,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Beasts',
      createdBy: '',
      description:
        'Bonus points for each kill you get with an Iron Banner weapon',
      name: 'Weapons of the Beasts'
    },
    {
      id: 65,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Beasts',
      createdBy: '',
      description:
        'Bonus points for each kill you get with an Iron Banner weapon',
      name: 'Weapons of the Beasts'
    },
    {
      id: 66,
      multiplierBonus: 0,
      scoringBonus: 150,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Pinnacle',
      createdBy: '',
      description:
        'You\'ve spent time earning "The Mountaintop" - use it to earn buckets of points!',
      name: "You've earned it"
    },
    {
      id: 67,
      multiplierBonus: 0,
      scoringBonus: 500,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Weapons',
      createdBy: '',
      description:
        'Earning kills with weapons whilst playing Mayhem earns loads of points!',
      name: 'Wrong game mode!'
    },
    {
      id: 68,
      multiplierBonus: 0,
      scoringBonus: 5000,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Still Alive',
      createdBy: '',
      description:
        'Kill at least 5 people during a match AND have 0 deaths to earn a bucket load of points',
      name: "You Can't Kill Me!"
    },
    {
      id: 69,
      multiplierBonus: 3,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Stacked',
      createdBy: '',
      description:
        'Get triple score if you have a full fireteam of 6 clan members',
      name: 'Fully Stacked'
    },
    {
      id: 70,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Pulse',
      createdBy: '',
      description: 'Get bonus points for pulse rifle kills',
      name: 'Pulsating'
    },
    {
      id: 71,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Scrub',
      createdBy: '',
      description: 'Get bonus points for Telesto, The Colony or Jotunn',
      name: 'Scrublord'
    },
    {
      id: 72,
      multiplierBonus: 3,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Tier',
      createdBy: '',
      description:
        'Get a multiplier based on your tier level. 1x for Tier 1, 2x for Tier2 and 3x for Tier 3',
      name: 'Reckoning Tier'
    },
    {
      id: 73,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Solar',
      createdBy: '',
      description:
        'Get bonus points for each kill you get using a solar weapon!',
      name: 'Solar Burn'
    },
    {
      id: 74,
      multiplierBonus: 0,
      scoringBonus: 3000,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Mercy',
      createdBy: '',
      description: 'Win a game by mercy ruling and get a bonus 3000 points!',
      name: 'Show Some Mercy!'
    },
    {
      id: 75,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Arc',
      createdBy: '',
      description:
        'Get bonus points for each kill you get using an arc weapon!',
      name: 'Arc Burn'
    },
    {
      id: 76,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Pinnacle',
      createdBy: '',
      description:
        "Earn bonus points for kills with the following pinnacle weapons: Oxygen SR3, The Recluse, 21% Delirium, Loaded Question, Breakneck, Mountaintop, Redrix's Claymore, Redrix's Broadsword, Luna's Howl or the Not Forgotten.",
      name: 'Pinnacle Kills'
    },
    {
      id: 77,
      multiplierBonus: 0,
      scoringBonus: 150,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Perfected',
      createdBy: '',
      description:
        "Outbreak Prime is back but it's been perfected! Use your new toy and earn bonus points",
      name: 'Pure Perfection'
    },
    {
      id: 78,
      multiplierBonus: 0,
      scoringBonus: 150,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Truth',
      createdBy: '',
      description: 'Get bonus points for kills with Truth',
      name: 'Telling the Truth'
    },
    {
      id: 79,
      multiplierBonus: 0,
      scoringBonus: 5000,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Rose',
      createdBy: '',
      description: 'Get more kills with Rose than any other weapon',
      name: 'Kiss from a Rose'
    },
    {
      id: 80,
      multiplierBonus: 0,
      scoringBonus: 200,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Bad Juju',
      createdBy: '',
      description: 'Get triple points for kills with the returning Bad Juju',
      name: 'End all Existence'
    },
    {
      id: 81,
      multiplierBonus: 0,
      scoringBonus: 200,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Bad Juju',
      createdBy: '',
      description: 'Get triple points for kills with the returning Bad Juju',
      name: 'End all Existence'
    },
    {
      id: 82,
      multiplierBonus: 0.1,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Solstice',
      createdBy: '',
      description:
        'Bonus 10% for each precision kill of the daily matching element. Lose 10% for each precision kill that is non matching (inc kinetic). Range: 10% -> 300%',
      name: 'Solstice'
    },
    {
      id: 83,
      multiplierBonus: 0,
      scoringBonus: 200,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Super',
      createdBy: '',
      description: 'Kills with your super are worth triple points',
      name: 'Superman'
    },
    {
      id: 84,
      multiplierBonus: 0,
      scoringBonus: 200,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Element',
      createdBy: '',
      description:
        'Kills with weapons that match the current days element boost count as triple',
      name: 'Elementary'
    },
    {
      id: 85,
      multiplierBonus: 2,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Cautious',
      createdBy: '',
      description: 'Die twice or less and get double points',
      name: 'Playing cautiously'
    },
    {
      id: 86,
      multiplierBonus: 0,
      scoringBonus: 1500,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Invader',
      createdBy: '',
      description: 'Killing an invader counts as an additional 15 kills!',
      name: 'Destroy the Invaders'
    },
    {
      id: 87,
      multiplierBonus: 2,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Runaway',
      createdBy: '',
      description: 'Double points if you win the game in the first two rounds.',
      name: 'Gambit Runaway'
    },
    {
      id: 88,
      multiplierBonus: 0,
      scoringBonus: 1000,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Key Play',
      createdBy: '4611686018465086194',
      description:
        "Defeat the last Blocker at your team's bank three times in a single round.",
      name: 'Key Play'
    },
    {
      id: 89,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Exotic',
      createdBy: '',
      description: 'Kills with exotics are worth double points',
      name: 'How exotic!'
    },
    {
      id: 90,
      multiplierBonus: 0,
      scoringBonus: 0,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Kills',
      createdBy: '',
      description:
        'Only Kills count for this event - assists and deaths are worth zero',
      name: 'Kills Only'
    },
    {
      id: 91,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Sweat',
      createdBy: '',
      description:
        'Kills with Rat King, Sweet Business, Thorn, Vigilance Wing, and Tractor Cannon are worth an extra +100 points',
      name: 'No Sweat'
    },
    {
      id: 92,
      multiplierBonus: 0,
      scoringBonus: 500,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Medals',
      createdBy: '',
      description:
        'Earn an extra +500 points for each Midnight Society, Running with the Pack, and First Blood medal earned',
      name: 'Heavy Medal'
    },
    {
      id: 93,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Medieval',
      createdBy: '',
      description: 'Kills with any sword or bow count for double',
      name: 'Medieval Bonus'
    },
    {
      id: 94,
      multiplierBonus: 0,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Melee',
      createdBy: '',
      description:
        'Earn a bonus 10% boost for each melee kill, but lose 1% for each weapon kill. Multiplier range: 100-500%',
      name: 'Who needs guns?'
    },
    {
      id: 95,
      multiplierBonus: 0,
      scoringBonus: 200,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Death',
      createdBy: '',
      description:
        "Kills with the 'Deathbringer' exotic are worth triple points",
      name: 'Bringing the death'
    },
    {
      id: 96,
      multiplierBonus: 0,
      scoringBonus: -100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Randy',
      createdBy: 'anon',
      description: "Kills with Randy's Throwing Knife will be worth nothing",
      name: 'Say No To Randy'
    },
    {
      id: 97,
      multiplierBonus: 0,
      scoringBonus: -100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Recluse',
      createdBy: 'anon',
      description: 'Kills with Recluse will be worth nothing',
      name: 'Excuse Recluse'
    },
    {
      id: 98,
      multiplierBonus: 0,
      scoringBonus: 400,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Supers',
      createdBy: '4611686018439431038',
      description: 'Super kills are worth 5x more',
      name: 'Unleash the Light'
    },
    {
      id: 99,
      multiplierBonus: 0.02,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Spree',
      createdBy: '4611686018439431038',
      description:
        '2% modifier increase for each kill but - 20% for each death (Range 100% to 500%)',
      name: 'Spree'
    },
    {
      id: 100,
      multiplierBonus: 1,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Haunted',
      createdBy: '',
      description:
        'x1 score for Adept, x2 for Hero, x3 for Legend and x4 for Master',
      name: 'Moons Haunted'
    },
    {
      id: 101,
      multiplierBonus: 0,
      scoringBonus: 100,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Paradox',
      createdBy: '4611686018439431038',
      description: 'Kills with the Perfect Paradox are worth x2',
      name: 'Perfect Paradox'
    },
    {
      id: 102,
      multiplierBonus: 0.05,
      scoringBonus: 0,
      multiplierModifier: true,
      scoringModifier: false,
      shortName: 'Armoury',
      createdBy: '4611686018439431038',
      description:
        'Increased modifier for each different gun used - 5% for each different gun (Range 100% to 500%)',
      name: 'Armoury'
    },
    {
      id: 103,
      multiplierBonus: 0,
      scoringBonus: 25000,
      multiplierModifier: false,
      scoringModifier: true,
      shortName: 'Completionist',
      createdBy: '4611686018439431038',
      description:
        'Lots of bonus points for a full raid completion that was started fresh without going to orbit',
      name: 'Completionist'
    }
  ].sort((a, b) => a.name.localeCompare(b.name)),
  tooltipProps: { disabled: true }
}

const Wrapper = styled('div')`
  * {
    vertical-align: top;
  }

  [hidden] {
    display: inline-block;
    margin: 10px;
    position: static;
    transform: none;
  }
`

All.decorators = [
  Story => (
    <Wrapper>
      <Story />
    </Wrapper>
  )
]
