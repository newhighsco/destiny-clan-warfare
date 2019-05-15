import React from 'react'
import { shallow } from 'enzyme'
import Avatar from './Avatar'

const color = '#5be7de'
const background = {
  color: '#5be7de',
  icon: '53468fe0799b424f995509d03be6bfa8'
}
const foreground = {
  color: '#f0f0f0',
  icon: 'c0ecd484a44c9aa934f9fb67e1ac1108'
}

describe('Component: Avatar', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<Avatar />)

    expect(wrapper.prop('className')).toEqual('avatar')
    expect(wrapper.find('img').prop('src')).toEqual(
      'https://www.bungie.net/img/profile/avatars/default_avatar.gif'
    )
  })

  test('should output the expected markup when `size` prop passed', function() {
    const wrapper = shallow(<Avatar size="small" />)

    expect(wrapper.prop('className')).toEqual('avatar avatar--small')
  })

  test('should output the expected markup when `cutout` prop passed', function() {
    const wrapper = shallow(<Avatar cutout />)

    expect(wrapper.prop('className')).toEqual('avatar avatar--cutout')
  })

  test('should output the expected markup when `outline` prop passed', function() {
    const wrapper = shallow(<Avatar outline />)

    expect(wrapper.prop('className')).toEqual('avatar avatar--outline')
  })

  test('should output the expected markup when `children` prop passed', function() {
    const wrapper = shallow(<Avatar>Children</Avatar>)

    expect(wrapper.prop('className')).toEqual('avatar avatar--inline')
    expect(wrapper.text()).toEqual('Children')
  })

  test('should output the expected markup when `color` prop passed', function() {
    var wrapper = shallow(<Avatar color={'red'} />)

    expect(wrapper.prop('className')).toEqual('avatar')
    expect(wrapper.prop('style')).toEqual(null)

    wrapper = shallow(<Avatar color={color} />)

    expect(wrapper.prop('className')).toEqual('avatar')
    expect(wrapper.prop('style')).toEqual({ backgroundColor: color })
  })

  test('should output the expected markup when `background` prop passed', function() {
    var wrapper = shallow(<Avatar background={{}} />)

    expect(wrapper.prop('className')).toEqual('avatar')

    var layer = wrapper.find('AvatarLayer')

    expect(layer.length).toEqual(1)

    var layerWrapper = shallow(layer.first().getElement())

    expect(layerWrapper.type()).toEqual(null)

    wrapper = shallow(<Avatar background={background} />)
    layer = wrapper.find('AvatarLayer')

    expect(layer.length).toEqual(1)
    expect(layer.prop('color')).toEqual(background.color)
    expect(layer.prop('icon')).toEqual(background.icon)

    layerWrapper = shallow(layer.first().getElement())

    expect(layerWrapper.prop('className')).toEqual('avatar__layer')
    expect(layerWrapper.find('feColorMatrix').prop('values')).toEqual(
      '0.357 0 0 0 0 0 0.906 0 0 0 0 0 0.871 0 0 0 0 0 1 0'
    )
    expect(layerWrapper.find('image').prop('xlinkHref')).toEqual(
      'https://www.bungie.net/common/destiny2_content/icons/cb_decal_square_53468fe0799b424f995509d03be6bfa8.png'
    )
  })

  test('should output the expected markup when `foreground` prop passed', function() {
    var wrapper = shallow(<Avatar foreground={{}} />)

    expect(wrapper.prop('className')).toEqual('avatar')

    var layer = wrapper.find('AvatarLayer')

    expect(layer.length).toEqual(1)

    var layerWrapper = shallow(layer.first().getElement())

    expect(layerWrapper.type()).toEqual(null)

    wrapper = shallow(<Avatar foreground={foreground} />)
    layer = wrapper.find('AvatarLayer')

    expect(layer.length).toEqual(1)
    expect(layer.prop('color')).toEqual(foreground.color)
    expect(layer.prop('icon')).toEqual(foreground.icon)

    layerWrapper = shallow(layer.first().getElement())

    expect(layerWrapper.prop('className')).toEqual('avatar__layer')
    expect(layerWrapper.find('feColorMatrix').prop('values')).toEqual(
      '0.941 0 0 0 0 0 0.941 0 0 0 0 0 0.941 0 0 0 0 0 1 0'
    )
    expect(layerWrapper.find('image').prop('xlinkHref')).toEqual(
      'https://www.bungie.net/common/destiny2_content/icons/cb_decal_square_c0ecd484a44c9aa934f9fb67e1ac1108.png'
    )
  })
})
