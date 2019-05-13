import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'

describe('Component: Header', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<Header />)

    expect(wrapper.prop('className')).toEqual('header')
  })
})
