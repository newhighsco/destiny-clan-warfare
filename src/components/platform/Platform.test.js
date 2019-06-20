import React from 'react'
import { shallow } from 'enzyme'
import { Platform, PlatformList } from './Platform'
import List from '../list/List'

describe('Component: Platform', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<Platform />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when invalid `name` prop passed', function() {
    const wrapper = shallow(<Platform id="nonexistent" />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when valid `id` prop passed', function() {
    const wrapper = shallow(<Platform id={1} />)

    expect(wrapper.prop('className')).toEqual('platform')
  })

  test('should output the expected markup when `size` prop passed', function() {
    const wrapper = shallow(<Platform id={1} size="small" />)

    expect(wrapper.prop('className')).toEqual('platform platform--small')
  })
})

describe('Component: PlatformList', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<PlatformList />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when invalid `platforms` prop passed', function() {
    const wrapper = shallow(
      <PlatformList platforms={[{ id: 2, percentage: 1 }]} />
    )

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when valid `platforms` prop passed', function() {
    const wrapper = shallow(
      <PlatformList
        platforms={[{ id: 1, percentage: 10 }, { id: 2, percentage: 1 }]}
      />
    )

    expect(wrapper.type()).toEqual(List)
    expect(wrapper.prop('className')).toEqual('platform-list')
    expect(wrapper.find('li').length).toEqual(1)
  })
})
