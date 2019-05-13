import React from 'react'
import { shallow } from 'enzyme'
import Landmark from './Landmark'

describe('Component: Landmark', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<Landmark />)

    expect(wrapper.find('a').prop('className')).toEqual('landmark')
  })

  test('should output the expected markup when `id` prop passed', function() {
    const wrapper = shallow(<Landmark id="the-id" />)
    const anchor = wrapper.find('a').first()

    expect(anchor.prop('className')).toEqual('landmark')
    expect(anchor.prop('id')).toEqual('the-id')
    expect(anchor.text()).toEqual('')
  })

  test('should output the expected markup when `id` prop passed', function() {
    const wrapper = shallow(<Landmark a11yText="Accessible text" />)
    const anchor = wrapper.find('a').first()
    const visuallyHidden = anchor.find('VisuallyHidden')

    expect(anchor.prop('className')).toEqual('landmark')
    expect(visuallyHidden.prop('children')).toEqual('Accessible text')
  })
})
