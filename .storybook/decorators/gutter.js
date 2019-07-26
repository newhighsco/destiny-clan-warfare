import React from 'react'
import { makeDecorator } from '@storybook/addons'
import { styled } from '@storybook/theming'

const Wrapper = styled.div(({ theme }) => ({
  padding: theme.gridCellSize
}))

export default makeDecorator({
  name: 'withGutter',
  parameterName: 'gutter',
  wrapper: (getStory, context) => {
    return (
      <Wrapper theme={context.parameters.options.theme}>
        {getStory(context)}
      </Wrapper>
    )
  }
})
