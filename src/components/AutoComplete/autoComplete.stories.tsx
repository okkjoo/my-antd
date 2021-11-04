import React from 'react'
import { storiesOf } from '@storybook/react'
import { action, actions } from '@storybook/addon-actions'
import { Autocomplete } from './autoComplete'

const SimpleComplete = () => {
  const lakers = ['james', 'david', 'rando', 'anthony', 'russell']
  const handleFetch = (query: string) => {
    return lakers.filter((name) => name.includes(query))
  }
  return (
    <Autocomplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
    />
  )
}
storiesOf('AutoComplete Component', module).add(
  'Autocomplete',
  SimpleComplete,
)
