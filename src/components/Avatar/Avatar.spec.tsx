import React from 'react'
import { configure, render, screen, waitFor } from '@testing-library/react'

import Avatar from '.'
import { Clan, Custom, Member } from './Avatar.stories'

describe('Components/Avatar', () => {
  describe('Empty', () => {
    it('should output the expected markup with no props', () => {
      render(<Avatar />)
      expect(screen.getByRole('img')).toBeInTheDocument()
    })
  })

  describe('Member', () => {
    it('should output the expected markup for a member', () => {
      render(<Avatar {...Member.args} />)
      expect(screen.getByRole('img')).toBeInTheDocument()
    })
  })

  describe('Clan', () => {
    it('should render the expected markup for a clan', async () => {
      await configure({ testIdAttribute: 'id' })
      render(<Avatar {...Clan.args} />)

      expect(screen.queryByRole('img')).not.toBeInTheDocument()
      expect(screen.getByTestId(`${Clan.args.id}-bg`)).toBeInTheDocument()
      expect(screen.getByTestId(`${Clan.args.id}-fg`)).toBeInTheDocument()
    })
  })

  describe('Custom', () => {
    it('should output the expected markup when `children` prop passed', async () => {
      const { container } = render(<Avatar {...Custom.args} />)

      await waitFor(() => container.querySelector('svg'))

      expect(container.querySelector('svg')).toBeInTheDocument()
    })
  })
})
