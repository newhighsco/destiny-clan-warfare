import React from 'react'
import { shallow } from 'enzyme'
import Credit from './Credit'

describe('Component: Credit', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<Credit />)

    expect(wrapper.prop('className')).toEqual('credit')
  })
})
