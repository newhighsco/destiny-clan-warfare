import React from 'react'
import { Link } from '@reach/router'
import { OutboundLink } from 'react-ga-donottrack'
import { shallow } from 'enzyme'
import SmartLink from './SmartLink'

describe('Component: Button', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<SmartLink />)

    expect(wrapper.type()).toEqual('button')
  })

  test('should output the expected markup when `children` prop passed', function() {
    const wrapper = shallow(<SmartLink>Children</SmartLink>)

    expect(wrapper.type()).toEqual('button')
    expect(wrapper.text()).toEqual('Children')
  })

  test('should output the expected markup when `className` prop passed', function() {
    const wrapper = shallow(
      <SmartLink className="additional">Children</SmartLink>
    )

    expect(wrapper.prop('className')).toEqual('additional')
  })

  test('should output the expected markup when internal `href` prop passed', function() {
    const wrapper = shallow(<SmartLink href="/test">Children</SmartLink>)

    expect(wrapper.type()).toEqual(Link)
    expect(wrapper.prop('to')).toEqual('/test')
    expect(wrapper.prop('target')).toEqual(undefined)
  })

  test('should output the expected markup when external `href` prop passed', function() {
    const wrapper = shallow(
      <SmartLink href="http://test.com">Children</SmartLink>
    )

    expect(wrapper.type()).toEqual(OutboundLink)
    expect(wrapper.prop('to')).toEqual('http://test.com')
    expect(wrapper.prop('target')).toEqual(null)
  })

  test('should output the expected markup when `target` prop passed', function() {
    const wrapper = shallow(
      <SmartLink href="http://test.com" target="_blank">
        Children
      </SmartLink>
    )

    expect(wrapper.type()).toEqual(OutboundLink)
    expect(wrapper.prop('to')).toEqual('http://test.com')
    expect(wrapper.prop('target')).toEqual('_blank')
  })
})
