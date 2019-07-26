import React from 'react'
import { makeDecorator } from '@storybook/addons'
import { styled } from '@storybook/theming'

const Wrapper = styled.div`
  & li span > * {
    vertical-align: top;
  }

  & span[tabindex] {
    display: inline-block;
    margin: ${props => props.theme.gridCellSize / 2}px;
    position static;
  }
`

export default makeDecorator({
  name: 'withTooltips',
  parameterName: 'tooltips',
  wrapper: (getStory, context) => {
    return (
      <Wrapper theme={context.parameters.options.theme}>
        {getStory(context)}
      </Wrapper>
    )
  }
})
