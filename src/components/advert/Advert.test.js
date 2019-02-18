import React from 'react'
import { shallow } from 'enzyme'
import Advert from './Advert'

const requiredProps = () => ({ client: 'Client', slot: 'Slot', format: 'Format' })

describe('Component: Advert', function () {
  test('should output no markup with default props', function () {
    const wrapper = shallow(<Advert {...requiredProps()} />)
    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when `enabled` prop passed', function () {
    const wrapper = shallow(<Advert {...requiredProps()} enabled />)
    expect(wrapper.prop('className')).toEqual('advert')
    expect(wrapper.find('ins').prop('data-ad-client')).toEqual('Client')
    expect(wrapper.find('ins').prop('data-ad-slot')).toEqual('Slot')
    expect(wrapper.find('ins').prop('data-ad-format')).toEqual('Format')
  })
})
