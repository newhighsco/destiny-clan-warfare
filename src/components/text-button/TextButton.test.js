import React from 'react'
import { shallow } from 'enzyme'
import TextButton from './TextButton'

describe('Component: Text button', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<TextButton />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when `children` prop passed', function() {
    const wrapper = shallow(<TextButton>Children</TextButton>)

    expect(wrapper.prop('className')).toEqual('text-button')
    expect(wrapper.find('Icon').length).toEqual(0)
  })

  test('should output the expected markup when `className` prop passed', function() {
    const wrapper = shallow(
      <TextButton className="additional">Children</TextButton>
    )

    expect(wrapper.prop('className')).toEqual('text-button additional')
  })

  test('should output the expected markup when `target` prop passed `_blank`', function() {
    const wrapper = shallow(<TextButton target="_blank">Children</TextButton>)

    expect(wrapper.find('Icon').length).toEqual(1)
  })
})
