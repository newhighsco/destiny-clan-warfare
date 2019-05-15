import React from 'react'
import { shallow } from 'enzyme'
import { Grid, GridItem } from './Grid'

describe('Component: Grid', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<Grid />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when `children` prop passed', function() {
    const wrapper = shallow(<Grid>Children</Grid>)

    expect(wrapper.prop('className')).toEqual('grid')
    expect(wrapper.text()).toEqual('Children')
  })

  test('should output the expected markup when `gutterless` prop passed', function() {
    const wrapper = shallow(<Grid gutterless>Children</Grid>)

    expect(wrapper.prop('className')).toEqual('grid grid--gutterless')
  })

  test('should output the expected markup when `gutter` prop passed', function() {
    const wrapper = shallow(<Grid gutter="one">Children</Grid>)

    expect(wrapper.prop('className')).toEqual('grid grid--gutter-one')
  })

  test('should output the expected markup when `reverse` prop passed', function() {
    const wrapper = shallow(<Grid reverse>Children</Grid>)

    expect(wrapper.prop('className')).toEqual('grid grid--reverse')
  })

  test('should output the expected markup when `middled` prop passed', function() {
    const wrapper = shallow(<Grid middled>Children</Grid>)

    expect(wrapper.prop('className')).toEqual('grid grid--middled')
  })

  test('should output the expected markup when `bottomed` prop passed', function() {
    const wrapper = shallow(<Grid bottomed>Children</Grid>)

    expect(wrapper.prop('className')).toEqual('grid grid--bottomed')
  })

  test('should output the expected markup when `flex` prop passed', function() {
    const wrapper = shallow(<Grid flex>Children</Grid>)

    expect(wrapper.prop('className')).toEqual('grid grid--flex')
  })

  test('should output the expected markup when `stacked` prop passed', function() {
    const wrapper = shallow(<Grid stacked>Children</Grid>)

    expect(wrapper.prop('className')).toEqual('grid grid--stacked')
  })
})

describe('Component: Grid item', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<GridItem />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when `children` prop passed', function() {
    const wrapper = shallow(<GridItem>Children</GridItem>)

    expect(wrapper.prop('className')).toEqual('grid__item')
    expect(wrapper.text()).toEqual('Children')
  })

  test('should output the expected markup when `sizes` prop passed', function() {
    const wrapper = shallow(
      <GridItem sizes={['first', 'second']}>Children</GridItem>
    )

    expect(wrapper.prop('className')).toEqual('grid__item first second')
  })
})
