import React from 'react'
import { shallow } from 'enzyme'
import ClanTag from './ClanTag'
import SmartLink from '../smart-link/SmartLink'

const requiredProps = () => ({ children: 'AVA' })

describe('Component: Clan tag', function() {
  test('should output the expected markup with default props', function() {
    const wrapper = shallow(<ClanTag {...requiredProps()} />)

    expect(wrapper.type()).toEqual('span')
    expect(wrapper.prop('className')).toEqual('clan-tag')
    expect(wrapper.prop('to')).toEqual(undefined)
    expect(wrapper.text()).toEqual('AVA')
  })

  test('should output additional className when `className` prop passed', function() {
    const wrapper = shallow(<ClanTag {...requiredProps()} className="foo" />)

    expect(wrapper.prop('className')).toEqual('clan-tag foo')
  })

  test('should render as a `Link` when `href` prop passed', function() {
    const wrapper = shallow(<ClanTag {...requiredProps()} href="#" />)

    expect(wrapper.type()).toEqual(SmartLink)
    expect(wrapper.prop('href')).toEqual('#')
  })
})
