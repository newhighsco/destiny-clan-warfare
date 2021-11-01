import React from 'react'
import Banner from '@components/Banner'

export default {
  title: 'Components/Banner',
  component: Banner
}

const Template = args => <Banner {...args} />

export const source = Template.bind({})

export const example = Template.bind({})

example.args = {
  decalId: 4142223384,
  decalColorId: 3379387794,
  decalBackgroundColorId: 3535193483,
  gonfalonId: 1473910866,
  gonfalonColorId: 2124081031,
  gonfalonDetailId: 1647698443,
  gonfalonDetailColorId: 4078567643,
  fill: '#5be7de',
  background: {
    fill: '#79a2ce',
    src: 'https://www.bungie.net/common/destiny2_content/icons/cb_gdetail_40fbf61c1e0526b8554a4a5744eacd8d.png'
  },
  emblem: {
    background: {
      fill: '#5be7de',
      src: 'https://www.bungie.net/common/destiny2_content/icons/cb_decal_d9a8bd414dc07973e42db158dc38539c.png'
    },
    foreground: {
      fill: '#f0f0f0',
      src: 'https://www.bungie.net/common/destiny2_content/icons/cb_decal_8dee209c6f24487d16c831d0395d52d4.png'
    }
  }
}
