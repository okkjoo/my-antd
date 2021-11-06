import React from 'react'
import { storiesOf } from '@storybook/react'
import { action, actions } from '@storybook/addon-actions'
import { Autocomplete, DataSourceType } from './autoComplete'

interface LakerPlaterProps {
  value: string
  number: number
}
const SimpleComplete = () => {
  const lakers = ['james', 'david', 'rando', 'anthony', 'russell']
  const lakersWithNumber = [
    { value: 'james', number: 6 },
    { value: 'david', number: 3 },
    { value: 'rando', number: 4 },
    { value: 'anthony', number: 7 },
    { value: 'russell', number: 0 },
  ]
  const handleFetch = (query: string) => {
    return lakers
      .filter((name) => name.includes(query))
      .map((name) => ({ value: name }))
  }
  // const handleFetch = (query: string) => {
  //   return lakersWithNumber.filter((player) =>
  //     player.value.includes(query),
  //   )
  // }

  // const renderOption = (item: DataSourceType<LakerPlaterProps>) => {
  //   return (
  //     <>
  //       <h2>Name:{item.value}</h2>
  //       <p>Number:{item.number}</p>
  //     </>
  //   )
  // }

  return (
    <Autocomplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      // renderOption={renderOption}
    />
  )
}
storiesOf('AutoComplete Component', module).add(
  'Autocomplete',
  SimpleComplete,
)
