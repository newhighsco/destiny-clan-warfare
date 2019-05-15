import React from 'react'
import { shallow } from 'enzyme'
import Card from './Card'

describe('Component: Card', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<Card />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when `children` prop passed', function() {
    const wrapper = shallow(<Card>Children</Card>)

    expect(wrapper.prop('className')).toEqual('card')
    expect(wrapper.prop('center')).toEqual(undefined)
    expect(wrapper.prop('children')).toEqual('Children')
  })

  test('should output the expected markup when `className` prop passed', function() {
    const wrapper = shallow(<Card className="additional">Children</Card>)

    expect(wrapper.prop('className')).toEqual('card additional')
  })

  test('should output the expected markup when `cutout` prop passed', function() {
    const wrapper = shallow(<Card cutout>Children</Card>)

    expect(wrapper.prop('className')).toEqual('card card--cutout')
  })

  test('should output the expected markup when `center` prop passed', function() {
    const wrapper = shallow(<Card center>Children</Card>)

    expect(wrapper.prop('className')).toEqual('card')
    expect(wrapper.prop('center')).toEqual(true)
  })
})
