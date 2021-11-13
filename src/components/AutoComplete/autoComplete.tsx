import React, {
  FC,
  useState,
  ChangeEvent,
  ReactElement,
  KeyboardEvent,
  useEffect,
  useRef,
} from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

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

  const [inputValue, setInputValue] = useState<string>(
    value as string,
  )
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [highlightIndex, setHighlightIndex] = useState<number>(-1)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)

  const debouncedValue = useDebounce(inputValue, 500)

  useClickOutside(componentRef, () => {
    setSuggestions([])
  })

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        // console.log('triggered')
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
    setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])

  const highlight = (index: number) => {
    if (index < 0) index = suggestions.length - 1
    if (index >= suggestions.length) index = 0
    setHighlightIndex(index)
  }

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 'ArrowUp':
        highlight(highlightIndex - 1)
        break
      case 'ArrowDown':
        highlight(highlightIndex + 1)
        break
      case 'Escape':
        setSuggestions([])
        break
      default:
        break
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, idx) => {
          const cnames = classNames('suggestion-item', {
            'item-highlighted': idx === highlightIndex,
          })
          return (
            <li
              key={idx}
              className={cnames}
              onClick={() => handleSelect(item)}
            >
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <div className='zhou-auto-complete' ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeydown}
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
