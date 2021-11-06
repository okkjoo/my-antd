import React, { FC, useState, ChangeEvent, ReactElement } from 'react'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface DataSourceObject {
  value: string
}
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutocompleteProps
  extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (
    str: string,
  ) => DataSourceType[] | Promise<DataSourceType>[]
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType<any>) => ReactElement<any>
}
export const AutoComplete: FC<AutocompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props

  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    if (value) {
      const results = fetchSuggestions(value)
      if (results instanceof Promise) {
        console.log('triggered')
        setLoading(true)
        results.then((data) => {
          setSuggestions(data)
          setLoading(false)
        })
      } else {
        setSuggestions(results as DataSourceType[])
      }
    } else {
      setSuggestions([])
    }
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, idx) => (
          <li key={idx} onClick={() => handleSelect(item)}>
            {renderTemplate(item)}
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

      {loading && (
        <ul>
          loading
          <Icon icon='spinner' spin />
        </ul>
      )}

      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}
