import React from 'react'
import { shallow } from 'enzyme'
import Sponsorship from './Sponsorship'
import Card from '../card/Card'

describe('Component: Sponsorship', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<Sponsorship />)

    expect(wrapper.type()).toEqual(Card)
  })
})
