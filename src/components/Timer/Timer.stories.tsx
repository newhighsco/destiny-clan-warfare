import React from 'react'
import dayjs from 'dayjs'
import { Story } from '@storybook/react/types-6-0'
import Timer, { TimerProps } from '@components/Timer'

const now = dayjs()
const nextSecond = now.subtract(-1, 's')
const nextMinute = now.subtract(-1, 'm').startOf('m')
const nextHour = now.subtract(-1, 'h').startOf('h')
const yesterday = now.subtract(1, 'd').startOf('d')
const tomorrow = now.subtract(-24, 'h').subtract(-2, 's')
const overmorrow = now.subtract(-48, 'h').subtract(-2, 's')
const lastWeek = now.subtract(1, 'w').startOf('d')
const nextWeek = now.subtract(-1, 'w').startOf('d')
const lastMonth = now.subtract(1, 'M').startOf('d')
const nextMonth = now.subtract(-1, 'M').startOf('d')
const lastYear = now.subtract(1, 'y').startOf('d')
const nextYear = now.subtract(-1, 'y').startOf('d')

export default {
  title: 'Components/Timer',
  component: Timer
}

const Template: Story<TimerProps> = args => <Timer {...args} />

export const source = Template.bind({})

source.args = {
  start: now.format(),
  end: now.format()
}

const Stories: Story<{ items: Array<TimerProps> }> = args => (
  <>
    {args.items.map((item, i) => (
      <React.Fragment key={i}>
        <Timer {...item} />
        <br />
      </React.Fragment>
    ))}
  </>
)

export const current = Stories.bind({})

current.args = {
  items: [
    {
      start: yesterday,
      end: nextYear
    },
    {
      start: yesterday,
      end: nextMonth
    },
    {
      start: yesterday,
      end: nextWeek
    },
    {
      start: yesterday,
      end: overmorrow
    },
    {
      start: yesterday,
      end: tomorrow
    },
    {
      start: yesterday,
      end: now.subtract(-6, 'h').startOf('h')
    },
    {
      start: yesterday,
      end: nextHour
    },
    {
      start: yesterday,
      end: nextMinute
    },
    {
      start: yesterday,
      end: nextSecond
    }
  ]
}

export const future = Stories.bind({})

future.args = {
  items: [
    {
      start: nextYear,
      end: nextYear
    },
    {
      start: nextMonth,
      end: nextYear
    },
    {
      start: nextWeek,
      end: nextWeek
    },
    {
      start: overmorrow,
      end: nextWeek
    },
    {
      start: tomorrow,
      end: nextWeek
    },
    {
      start: now.subtract(-6, 'h').startOf('h'),
      end: nextWeek
    },
    {
      start: nextHour,
      end: nextWeek
    },
    {
      start: nextMinute,
      end: nextWeek
    },
    {
      start: nextSecond,
      end: nextMinute
    }
  ]
}

export const past = Stories.bind({})

past.args = {
  items: [
    {
      start: lastYear,
      end: yesterday
    },
    {
      start: lastYear,
      end: lastWeek
    },
    {
      start: lastYear,
      end: lastMonth
    },
    {
      start: lastYear,
      end: lastYear
    }
  ]
}
