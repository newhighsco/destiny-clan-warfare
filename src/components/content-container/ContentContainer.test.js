import React from 'react'
import { shallow } from 'enzyme'
import ContentContainer from './ContentContainer'

describe('Component: Content container', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<ContentContainer />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when `children` prop passed', function() {
    const wrapper = shallow(<ContentContainer>Children</ContentContainer>)

    expect(wrapper.prop('className')).toEqual('content-container')
    expect(wrapper.prop('children')).toEqual('Children')
  })

  test('should output the expected markup when `className` prop passed', function() {
    const wrapper = shallow(
      <ContentContainer className="additional">Children</ContentContainer>
    )

    expect(wrapper.prop('className')).toEqual('content-container additional')
  })

  test('should output the expected markup when `gutter` prop passed', function() {
    const wrapper = shallow(
      <ContentContainer gutter>Children</ContentContainer>
    )

    expect(wrapper.prop('className')).toEqual(
      'content-container content-container--gutter'
    )
  })
})
