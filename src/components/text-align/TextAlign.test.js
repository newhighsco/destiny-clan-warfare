import React from 'react'
import { shallow } from 'enzyme'
import TextAlign from './TextAlign'

describe('Component: TextAlign', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<TextAlign />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when `children` prop passed', function() {
    const wrapper = shallow(
      <TextAlign>
        <p>Children</p>
      </TextAlign>
    )

    expect(wrapper.type()).toEqual('p')
    expect(wrapper.prop('className')).toEqual(undefined)
    expect(wrapper.text()).toEqual('Children')
  })

  test('should output the expected markup when `left` prop passed', function() {
    const wrapper = shallow(
      <TextAlign left>
        <p>Children</p>
      </TextAlign>
    )

    expect(wrapper.type()).toEqual('div')
    expect(wrapper.prop('className')).toEqual('text-left')
    expect(wrapper.text()).toEqual('Children')
  })

  test('should output the expected markup when `right` prop passed', function() {
    const wrapper = shallow(
      <TextAlign right>
        <p>Children</p>
      </TextAlign>
    )

    expect(wrapper.type()).toEqual('div')
    expect(wrapper.prop('className')).toEqual('text-right')
    expect(wrapper.text()).toEqual('Children')
  })

  test('should output the expected markup when `center` prop passed', function() {
    const wrapper = shallow(
      <TextAlign center>
        <p>Children</p>
      </TextAlign>
    )

    expect(wrapper.type()).toEqual('div')
    expect(wrapper.prop('className')).toEqual('text-center')
    expect(wrapper.text()).toEqual('Children')
  })

  test('should output the expected markup when `justify` prop passed', function() {
    const wrapper = shallow(
      <TextAlign justify>
        <p>Children</p>
      </TextAlign>
    )

    expect(wrapper.type()).toEqual('div')
    expect(wrapper.prop('className')).toEqual('text-justify')
    expect(wrapper.text()).toEqual('Children')
  })
})
