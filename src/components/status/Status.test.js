import React from 'react'
import { shallow } from 'enzyme'
import Status from './Status'

describe.skip('Component: Status', function() {
  test('should output the expected markup with no props', async function() {
    const wrapper = shallow(<Status />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when `isEnhanced` and `apiDisabled` prop passed', function() {
    const wrapper = shallow(<Status isEnhanced apiDisabled />)

    expect(wrapper.prop('className')).toEqual('status')
    expect(wrapper.find('Notification').prop('state')).toEqual('error')
  })
})
