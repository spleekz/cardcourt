import React, { useState } from 'react'

import isEnglish from 'is-english'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { Lang } from 'stores/stores-utility-types'

import { getCursorState, getInputBGC, getInputBoxShadow } from './utils'

type IFormWordInput = {
  inputValue: string
  index: number
  lang: Lang
}

export const FormWordInput: React.FC<IFormWordInput> = ({ inputValue, index, lang }) => {
  const { register, setValue } = useFormContext()

  const [isInputOnFocus, setIsInputOnFocus] = useState<boolean>(false)
  const [isInputOnHover, setIsInputOnHover] = useState<boolean>(false)
  const [isInputEmpty, setIsInputEmpty] = useState<boolean>(!inputValue)

  const validateInputLanguage = (value: string): boolean => {
    if (lang === 'en') {
      return isEnglish(value)
    } else return !isEnglish(value)
  }

  const onInputBlur = (): void => {
    setIsInputOnFocus(false)

    const trimmedInputValue = inputValue.trim()
    setValue(`words.${index}.${lang}`, trimmedInputValue)

    setIsInputEmpty(trimmedInputValue === '')
  }

  return (
    <WordInput
      {...register(`words.${index}.${lang}`, {
        required: true,
        validate: (v) => validateInputLanguage(v),
      })}
      lang={lang}
      placeholder={lang === 'en' ? 'Слово на английском' : 'Перевод'}
      onFocus={() => setIsInputOnFocus(true)}
      onBlur={onInputBlur}
      onMouseEnter={() => setIsInputOnHover(true)}
      onMouseLeave={() => setIsInputOnHover(false)}
      isOnFocus={isInputOnFocus}
      isOnHover={isInputOnHover}
      isEmpty={isInputEmpty}
    />
  )
}

type IWordInputProps = {
  isOnFocus: boolean
  isOnHover: boolean
  isEmpty: boolean
  lang: Lang
}

const WordInput = styled.input<IWordInputProps>`
  width: 48%;
  padding: 6px 3px;
  font-size: 26px;
  transition: all 0.33s;
  text-align: ${(props) => props.lang === 'en' && !props.isOnFocus && 'right'};
  cursor: ${({ isEmpty, isOnHover, isOnFocus }) => getCursorState({ isEmpty, isOnHover, isOnFocus })};
  box-shadow: ${({ isEmpty, isOnHover, isOnFocus }) =>
    getInputBoxShadow({ isEmpty, isOnHover, isOnFocus })};
  background-color: ${({ isEmpty, isOnHover, isOnFocus }) =>
    getInputBGC({ isEmpty, isOnHover, isOnFocus })};
  ::placeholder {
    text-align: left;
    font-size: 18px;
  }
`
