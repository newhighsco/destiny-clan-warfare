import React from 'react'
import { shallow } from 'enzyme'
import Notification from './Notification'

describe('Component: Notification', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<Notification />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when `children` prop passed', function() {
    const wrapper = shallow(<Notification>Children</Notification>)

    expect(wrapper.prop('className')).toEqual('notification')
    expect(wrapper.text()).toEqual('Children')
  })

  test('should output the expected markup when `html` prop passed', function() {
    const wrapper = shallow(<Notification html="Children" />)

    expect(wrapper.prop('className')).toEqual('notification')
    expect(
      wrapper.find('.notification__inner').prop('dangerouslySetInnerHTML')
    ).toEqual({ __html: 'Children' })
  })

  test('should output the expected markup when `state` prop passed', function() {
    const wrapper = shallow(<Notification state="error">Children</Notification>)

    expect(wrapper.prop('className')).toEqual(
      'notification notification--error'
    )
  })
})
