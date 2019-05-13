import React from 'react'
import { shallow } from 'enzyme'
import { Link } from '@reach/router'
import ClanTag from './ClanTag'

const requiredProps = () => ({ children: 'AVA' })

describe('Component: ClanTag', function() {
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

    expect(wrapper.type()).toEqual(Link)
    expect(wrapper.prop('to')).toEqual('#')
  })
})
