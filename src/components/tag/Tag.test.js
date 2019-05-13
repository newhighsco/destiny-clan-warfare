import React from 'react'
import { shallow } from 'enzyme'
import { Tag, TagList } from './Tag'

const tags = [
  { name: 'nonexistent' },
  { name: 'Beta Tester' },
  { name: 'Creator' }
]

describe('Component: Tag', function() {
  test('should output the expected markup with no props', function() {
    const wrapper = shallow(<Tag />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when invalid `name` prop passed', function() {
    const wrapper = shallow(<Tag {...tags[0]} />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when valid `name` prop passed', function() {
    var wrapper = shallow(<Tag {...tags[1]} />)

    expect(wrapper.prop('className')).toEqual('tag tag--tier-3')
    expect(wrapper.prop('data-label')).toEqual('Beta')

    wrapper = shallow(<Tag {...tags[2]} />)

    expect(wrapper.prop('className')).toEqual('tag tag--tier-1')
    expect(wrapper.prop('data-label')).toEqual('Creator')
  })
})

describe('Component: TagList', function() {
  test('should output the expected markup with no props', function() {
    var wrapper = shallow(<TagList />)

    expect(wrapper.type()).toEqual(null)

    wrapper = shallow(<TagList tags={[]} />)

    expect(wrapper.type()).toEqual(null)

    wrapper = shallow(<TagList tags={[tags[0]]} />)

    expect(wrapper.type()).toEqual(null)
  })

  test('should output the expected markup when `tags` prop passed', function() {
    const wrapper = shallow(<TagList tags={tags} />)

    expect(wrapper.prop('className')).toEqual('list--inline tag-list')
    expect(wrapper.find('Tag').length).toEqual(2)
    expect(
      wrapper
        .find('Tag')
        .first()
        .prop('name')
    ).toEqual(tags[1].name)
  })
})
