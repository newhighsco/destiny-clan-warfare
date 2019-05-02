import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import inPercy from '@percy-io/in-percy'
import Timer from './Timer'

const moment = require('moment')
const tickInterval = inPercy() ? null : undefined

storiesOf('Timer', module)
  .add('Current', () => (
    <Fragment>
      <p>{`state = { active: false }`}</p>
      <Timer
        active={false}
        tickInterval={tickInterval}
        start={moment
          .utc()
          .subtract(1, 'd')
          .startOf('d')}
        end={moment
          .utc()
          .add(7, 'd')
          .startOf('d')}
      />
      <p>{`state = { active: true }`}</p>
      <Timer
        tickInterval={tickInterval}
        start={moment
          .utc()
          .subtract(1, 'd')
          .startOf('d')}
        end={moment
          .utc()
          .add(7, 'd')
          .startOf('d')}
      />
      <Timer
        tickInterval={tickInterval}
        start={moment
          .utc()
          .subtract(1, 'd')
          .startOf('d')}
        end={moment
          .utc()
          .add(48, 'h')
          .add(2, 's')}
      />
      <Timer
        tickInterval={tickInterval}
        start={moment
          .utc()
          .subtract(1, 'd')
          .startOf('d')}
        end={moment
          .utc()
          .add(24, 'h')
          .add(2, 's')}
      />
      <Timer
        tickInterval={tickInterval}
        start={moment
          .utc()
          .subtract(1, 'd')
          .startOf('d')}
        end={moment
          .utc()
          .add(7, 'h')
          .startOf('h')}
      />
      <Timer
        tickInterval={tickInterval}
        start={moment
          .utc()
          .subtract(1, 'd')
          .startOf('d')}
        end={moment
          .utc()
          .add(1, 'h')
          .startOf('h')}
      />
      <Timer
        tickInterval={tickInterval}
        start={moment
          .utc()
          .subtract(1, 'd')
          .startOf('d')}
        end={moment
          .utc()
          .add(1, 'm')
          .startOf('m')}
      />
      <Timer
        tickInterval={tickInterval}
        start={moment
          .utc()
          .subtract(1, 'd')
          .startOf('d')}
        end={moment.utc().add(1, 's')}
      />
    </Fragment>
  ))
  .add('Future', () => (
    <Fragment>
      <p>{`state = { active: false }`}</p>
      <Timer
        tickInterval={tickInterval}
        active={false}
        start={moment
          .utc()
          .add(11, 'd')
          .startOf('d')}
        end={moment
          .utc()
          .add(17, 'd')
          .startOf('d')}
      />
      <p>{`state = { active: true }`}</p>
      <Timer
        tickInterval={tickInterval}
        start={moment
          .utc()
          .add(11, 'd')
          .startOf('d')}
        end={moment
          .utc()
          .add(17, 'd')
          .startOf('d')}
      />
      <Timer
        tickInterval={tickInterval}
        start={moment
          .utc()
          .add(48, 'h')
          .add(2, 's')}
        end={moment
          .utc()
          .add(7, 'd')
          .startOf('d')}
      />
      <Timer
        tickInterval={tickInterval}
        start={moment
          .utc()
          .add(24, 'h')
          .add(2, 's')}
        end={moment
          .utc()
          .add(7, 'd')
          .startOf('d')}
      />
      <Timer
        tickInterval={tickInterval}
        start={moment
          .utc()
          .add(1, 'd')
          .startOf('d')}
        end={moment
          .utc()
          .add(7, 'd')
          .startOf('d')}
      />
      <Timer
        tickInterval={tickInterval}
        start={moment
          .utc()
          .add(1, 'h')
          .startOf('h')}
        end={moment
          .utc()
          .add(7, 'd')
          .startOf('d')}
      />
      <Timer
        tickInterval={tickInterval}
        start={moment
          .utc()
          .add(1, 'm')
          .startOf('m')}
        end={moment
          .utc()
          .add(7, 'd')
          .startOf('d')}
      />
      <Timer
        tickInterval={tickInterval}
        start={moment.utc().add(1, 's')}
        end={moment
          .utc()
          .add(1, 'm')
          .startOf('m')}
      />
    </Fragment>
  ))
  .add('Past', () => (
    <Fragment>
      <p>{`state = { active: false }`}</p>
      <Timer
        tickInterval={tickInterval}
        active={false}
        start={moment
          .utc()
          .subtract(7, 'd')
          .startOf('d')}
        end={moment
          .utc()
          .subtract(1, 'd')
          .startOf('d')}
      />
      <p>{`state = { active: true }`}</p>
      <Timer
        tickInterval={tickInterval}
        start={moment
          .utc()
          .subtract(7, 'd')
          .startOf('d')}
        end={moment
          .utc()
          .subtract(1, 'd')
          .startOf('d')}
      />
    </Fragment>
  ))
