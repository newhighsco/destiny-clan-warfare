import React from 'react'
import { shallow } from 'enzyme'
import List from './List'

describe('Component: Header', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<List />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when `children` prop passed', function() {
    const wrapper = shallow(<List>Children</List>)

    expect(wrapper.type()).toEqual('ul')
    expect(wrapper.prop('className')).toEqual('list')
    expect(wrapper.text()).toEqual('Children')
  })

  test('should output the expected markup when `ordered` prop passed', function() {
    const wrapper = shallow(<List ordered>Children</List>)

    expect(wrapper.type()).toEqual('ol')
    expect(wrapper.prop('className')).toEqual('list')
    expect(wrapper.text()).toEqual('Children')
  })

  test('should output the expected markup when `unstyled` prop passed', function() {
    const wrapper = shallow(<List unstyled>Children</List>)

    expect(wrapper.prop('className')).toEqual('list list--unstyled')
  })

  test('should output the expected markup when `inline` prop passed', function() {
    const wrapper = shallow(<List inline>Children</List>)

    expect(wrapper.prop('className')).toEqual('list list--inline')
  })

  test('should output the expected markup when `commaSeparated` prop passed', function() {
    const wrapper = shallow(<List commaSeparated>Children</List>)

    expect(wrapper.prop('className')).toEqual('list list--comma-separated')
  })
})
