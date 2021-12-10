import React from 'react'
import { FieldArrayWithId } from 'react-hook-form'
import styled from 'styled-components'
import { ICard } from '../../../stores/CardsStore'
import { XIcon } from '../../../svg/XIcon'
import { FormWordInput } from './FormWordInput'

interface IFormWordPair {
  remove: (index?: number | number[] | undefined) => void
  fields: FieldArrayWithId<ICard, 'wordList', 'id'>[]
  index: number
}

const FormWordPairContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`
const FormWordPairBlock = styled.div`
  width: 93%;
  display: flex;
  justify-content: space-between;
`
const DeleteWordPairButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  margin-left: 5px;
  svg {
    width: 25px;
    height: 25px;
    position: absolute;
  }
`
const Dash = styled.span`
  align-self: center;
  margin: 0 5px;
`

export const FormWordPair: React.FC<IFormWordPair> = ({ remove, fields, index }) => {
  const deleteWordPair = (index: number): void => {
    if (fields.length !== 1) {
      remove(index)
    }
  }

  return (
    <FormWordPairContainer>
      <FormWordPairBlock>
        <FormWordInput inputValue={fields[index].en} index={index} lang='en' />
        <Dash>—</Dash>
        <FormWordInput inputValue={fields[index].ru} index={index} lang='ru' />
      </FormWordPairBlock>
      <DeleteWordPairButton type='button' onClick={() => deleteWordPair(index)}>
        <XIcon />
      </DeleteWordPairButton>
    </FormWordPairContainer>
  )
}
