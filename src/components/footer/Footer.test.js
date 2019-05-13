import React from 'react'
import { shallow } from 'enzyme'
import Footer from './Footer'

describe('Component: Footer', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<Footer />)

    expect(wrapper.prop('className')).toEqual('footer')
  })
})
