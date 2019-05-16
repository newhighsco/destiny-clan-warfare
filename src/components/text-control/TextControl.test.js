import React from 'react'
import { shallow } from 'enzyme'
import TextControl from './TextControl'

describe('Component: Text control', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<TextControl />)

    expect(wrapper.type()).toEqual('input')
    expect(wrapper.prop('className')).toEqual('text-control')
    expect(wrapper.prop('type')).toEqual('text')
    expect(wrapper.prop('row')).toEqual(undefined)
    expect(wrapper.prop('aria-invalid')).toEqual(undefined)
  })

  test('should output the expected markup when `multiLine` prop passed', function() {
    const wrapper = shallow(<TextControl multiLine />)

    expect(wrapper.type()).toEqual('textarea')
    expect(wrapper.prop('className')).toEqual(
      'text-control text-control--multi-line'
    )
    expect(wrapper.prop('type')).toEqual(undefined)
    expect(wrapper.prop('rows')).toEqual(3)
  })

  test('should output the expected markup when `className` prop passed', function() {
    const wrapper = shallow(<TextControl className="additional" />)

    expect(wrapper.prop('className')).toEqual('text-control additional')
  })

  test('should output the expected markup when `state` prop passed', function() {
    const wrapper = shallow(<TextControl state="error" />)

    expect(wrapper.prop('className')).toEqual(
      'text-control text-control--error'
    )
    expect(wrapper.prop('aria-invalid')).toEqual(true)
  })
})
