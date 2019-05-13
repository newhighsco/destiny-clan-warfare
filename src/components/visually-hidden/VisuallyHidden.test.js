import React from 'react'
import { shallow } from 'enzyme'
import { VisuallyHidden } from './VisuallyHidden'

describe('Component: VisuallyHidden', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<VisuallyHidden />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when `children` prop passed', function() {
    const wrapper = shallow(<VisuallyHidden>Children</VisuallyHidden>)

    expect(wrapper.prop('className')).toEqual('visually-hidden')
    expect(wrapper.text()).toEqual('Children')
  })
})
