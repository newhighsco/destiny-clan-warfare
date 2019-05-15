import React from 'react'
import { shallow } from 'enzyme'
import PageContainer from './PageContainer'

describe('Component: Page container', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<PageContainer />)

    expect(wrapper.find('main').prop('className')).toEqual('page-container')
    expect(wrapper.find('ContentContainer').children().length).toEqual(1)
  })

  test('should output the expected markup when `children` prop passed', function() {
    const wrapper = shallow(<PageContainer>Children</PageContainer>)

    // expect(wrapper.prop('className')).toEqual('content-container')
    expect(wrapper.find('ContentContainer').children().length).toEqual(2)
    expect(
      wrapper
        .find('ContentContainer')
        .children()
        .first()
        .text()
    ).toEqual('Children')
  })
})
