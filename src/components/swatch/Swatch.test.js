import React from 'react'
import { shallow } from 'enzyme'
import Swatch from './Swatch'

const requiredProps = () => ({ name: 'Red', value: '#ff0000' })

describe('Component: Swatch', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<Swatch />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup with default props', function() {
    const wrapper = shallow(<Swatch {...requiredProps()} />)

    expect(wrapper.prop('className')).toEqual('swatch')
    expect(wrapper.prop('style')).toEqual({ backgroundColor: '#ff0000' })
    expect(wrapper.find('h2').text()).toEqual('Red')
  })
})
