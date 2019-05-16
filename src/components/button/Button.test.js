import React from 'react'
import { shallow } from 'enzyme'
import { Button, ButtonGroup } from './Button'

describe('Component: Button', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<Button />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when `children` prop passed', function() {
    const wrapper = shallow(<Button>Children</Button>)

    expect(wrapper.prop('className')).toEqual('button')
    expect(wrapper.find('Icon').length).toEqual(0)
  })

  test('should output the expected markup when `size` prop passed', function() {
    const wrapper = shallow(<Button size="small">Children</Button>)

    expect(wrapper.prop('className')).toEqual('button button--small')
  })

  test('should output the expected markup when `solid` prop passed', function() {
    const wrapper = shallow(<Button solid>Children</Button>)

    expect(wrapper.prop('className')).toEqual('button button--solid')
  })

  test('should output the expected markup when `className` prop passed', function() {
    const wrapper = shallow(<Button className="additional">Children</Button>)

    expect(wrapper.prop('className')).toEqual('button additional')
  })

  test('should output the expected markup when `target` prop passed `_blank`', function() {
    const wrapper = shallow(<Button target="_blank">Children</Button>)

    expect(wrapper.find('Icon').length).toEqual(1)
  })
})

describe('Component: ButtonGroup', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<ButtonGroup />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when `children` prop passed', function() {
    const wrapper = shallow(<ButtonGroup>Children</ButtonGroup>)

    expect(wrapper.prop('className')).toEqual('button-group')
    expect(wrapper.text()).toEqual('Children')
  })

  test('should output the expected markup when `className` prop passed', function() {
    const wrapper = shallow(
      <ButtonGroup className="additional">Children</ButtonGroup>
    )

    expect(wrapper.prop('className')).toEqual('button-group additional')
    expect(wrapper.text()).toEqual('Children')
  })
})
