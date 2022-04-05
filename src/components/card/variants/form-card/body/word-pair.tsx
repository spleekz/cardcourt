import React from 'react'
import styled from 'styled-components'
import { SendedCardWords } from '../../../../../api/api'
import { XIcon } from '../../../../icons/x-icon'
import { FormWordInput } from './word-input/word-input'

interface IFormWordPair {
  removePair: () => void
  fields: SendedCardWords
  index: number
  color: string
}

export const FormWordPair: React.FC<IFormWordPair> = ({
  removePair,
  fields,
  index,
  color,
}) => {
  const deleteWordPair = (): void => {
    if (fields.length !== 1) {
      removePair()
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
        />
        <Dash>—</Dash>
        <FormWordInput
          color={color}
          inputValue={fields[index].ru}
          index={index}
          lang='ru'
        />
      </PairBlock>

      <DeletePairButton type='button' onClick={deleteWordPair}>
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
