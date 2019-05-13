import React from 'react'
import { shallow } from 'enzyme'
import Status from './Status'

describe('Component: Status', function() {
  test('should output the expected markup with no props', async function() {
    const wrapper = shallow(<Status />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when `active` prop passed', function() {
    const wrapper = shallow(<Status active />)

    expect(wrapper.prop('className')).toEqual(
      'status content-center content-gutter'
    )
    expect(wrapper.find('Notification').prop('state')).toEqual('error')
  })
})
