import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { Lang } from '../../../../../stores/check-store'
import isEnglish from 'is-english'

interface IFormWordInput {
  inputValue: string
  isEditCard: boolean
  index: number
  lang: Lang
  color: string
}
export const FormWordInput: React.FC<IFormWordInput> = ({
  inputValue,
  isEditCard,
  index,
  color,
  lang,
}) => {
  const { register } = useFormContext()

  const [isInputOnFocus, setIsInputOnFocus] = useState<boolean>(false)
  const [isInputOnHover, setIsInputOnHover] = useState<boolean>(false)
  const [isInputEmpty, setIsInputEmpty] = useState<boolean>(!isEditCard)

  const validateInputLanguage = (value: string): boolean => {
    if (lang === 'en') {
      return isEnglish(value)
    } else return !isEnglish(value)
  }

  const onInputBlur = (): void => {
    setIsInputOnFocus(false)
    if (inputValue.trim() === '') {
      setIsInputEmpty(true)
    } else {
      setIsInputEmpty(false)
    }
  }

  return (
    <WordInput
      {...register(`words.${index}.${lang}` as const, {
        required: true,
        validate: (v) => validateInputLanguage(v),
      })}
      lang={lang}
      placeholder={lang === 'en' ? 'Слово на английском' : 'Перевод'}
      onFocus={() => setIsInputOnFocus(true)}
      onBlur={onInputBlur}
      onMouseEnter={() => setIsInputOnHover(true)}
      onMouseLeave={() => setIsInputOnHover(false)}
      color={color}
      isOnFocus={isInputOnFocus}
      isOnHover={isInputOnHover}
      isEmpty={isInputEmpty}
    />
  )
}

interface IWordInputProps {
  isOnFocus: boolean
  isOnHover: boolean
  isEmpty: boolean
  lang: Lang
  color: string
}

const WordInput = styled.input<IWordInputProps>`
  width: 48%;
  padding: 6px 3px;
  font-size: 26px;
  transition: all 0.33s;
  text-align: ${(props) => props.lang === 'en' && !props.isOnFocus && 'right'};
  cursor: ${(props) => props.isOnHover && !props.isOnFocus && !props.isEmpty && 'pointer'};
  box-shadow: ${(props) =>
    (props.isEmpty || props.isOnHover || props.isOnFocus) && '0px 0px 11px 0px rgba(34, 60, 80, 0.4)'};
  background-color: ${(props) =>
    props.isEmpty
      ? '#ffffff'
      : props.isOnFocus
      ? '#ffffff'
      : props.isOnHover
      ? '#ffffff'
      : props.color};
  ::placeholder {
    text-align: left;
    font-size: 18px;
  }
`
