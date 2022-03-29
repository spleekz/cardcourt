import React from 'react'
import styled from 'styled-components'
import { SendedCardWords } from '../../../../api/api'
import { XIcon } from '../../../icons/x-icon'
import { FormWordInput } from './word-input'

interface IFormWordPair {
  remove: (index?: number | number[] | undefined) => void
  isEditCard: boolean
  fields: SendedCardWords
  index: number
  color: string
}

export const FormWordPair: React.FC<IFormWordPair> = ({
  remove,
  fields,
  index,
  isEditCard,
  color,
}) => {
  const deleteWordPair = (index: number): void => {
    if (fields.length !== 1) {
      remove(index)
    }
  }

  return (
    <Container>
      <PairBlock>
        <FormWordInput
          color={color}
          inputValue={fields[index].en}
          index={index}
          lang='en'
          isEditCard={isEditCard}
        />
        <Dash>—</Dash>
        <FormWordInput
          color={color}
          inputValue={fields[index].ru}
          index={index}
          lang='ru'
          isEditCard={isEditCard}
        />
      </PairBlock>
      <DeletePairButton type='button' onClick={() => deleteWordPair(index)}>
        <XIcon />
      </DeletePairButton>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`
const PairBlock = styled.div`
  width: 93%;
  display: flex;
  justify-content: space-between;
`
const DeletePairButton = styled.button`
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
