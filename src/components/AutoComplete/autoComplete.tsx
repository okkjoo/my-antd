import React, { FC, useState, ChangeEvent } from 'react'
import Input, { InputProps } from '../Input/input'

export interface AutocompleteProps
  extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => string[]
  onSelect?: (item: string) => void
}
export const Autocomplete: FC<AutocompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, ...restProps } = props

  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    if (value) {
      const results = fetchSuggestions(value)
      setSuggestions(results)
    } else {
      setSuggestions([])
    }
  }

  const handleSelect = (item: string) => {
    setInputValue(item)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
  }
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, idx) => (
          <li key={idx} onClick={() => handleSelect(item)}>
            {item}
          </li>
        ))}
      </ul>
    )
  }
  return (
    <div className='zhou-auto-complete'>
      <Input
        value={inputValue}
        onChange={handleChange}
        {...restProps}
      />
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}
