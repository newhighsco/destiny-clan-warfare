import React from 'react'
import { shallow } from 'enzyme'
import SiteContainer from './SiteContainer'

describe('Component: Site container', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<SiteContainer />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when `children` prop passed', function() {
    const wrapper = shallow(<SiteContainer>Children</SiteContainer>)

    expect(wrapper.type()).toEqual('div')
    expect(wrapper.prop('className')).toEqual('site-container')
    expect(wrapper.prop('children')).toEqual('Children')
  })

  test('should output the expected markup when `element` prop passed', function() {
    const wrapper = shallow(
      <SiteContainer element="span">Children</SiteContainer>
    )

    expect(wrapper.type()).toEqual('span')
  })
})
