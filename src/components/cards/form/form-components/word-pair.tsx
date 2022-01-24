import React from 'react'
import styled from 'styled-components'
import { SendedCardWords } from '../../../../api/api'
import { XIcon } from '../../../../svg/x-icon'
import { FormWordInput } from './word-input'

interface IFormWordPair {
  remove: (index?: number | number[] | undefined) => void
  isEditCard: boolean
  fields: SendedCardWords
  index: number
}

export const FormWordPair: React.FC<IFormWordPair> = ({ remove, fields, index, isEditCard }) => {
  const deleteWordPair = (index: number): void => {
    if (fields.length !== 1) {
      remove(index)
    }
  }

  return (
    <FormWordPairContainer>
      <FormWordPairBlock>
        <FormWordInput inputValue={fields[index].en} index={index} lang='en' isEditCard={isEditCard} />
        <Dash>—</Dash>
        <FormWordInput inputValue={fields[index].ru} index={index} lang='ru' isEditCard={isEditCard} />
      </FormWordPairBlock>
      <DeleteWordPairButton type='button' onClick={() => deleteWordPair(index)}>
        <XIcon />
      </DeleteWordPairButton>
    </FormWordPairContainer>
  )
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
