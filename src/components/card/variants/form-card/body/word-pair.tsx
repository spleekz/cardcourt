import React, { useState } from 'react'

import { XLg } from 'react-bootstrap-icons'
import styled from 'styled-components'

import { CardWordPairBlock } from 'components/card/card-shared-components/body'

import { SendedCardWords } from 'api/api'

import { FormWordInput } from './word-input/word-input'

type IFormWordPair = {
  removePair: () => void
  fields: SendedCardWords
  index: number
}

export const FormWordPair: React.FC<IFormWordPair> = ({ removePair, fields, index }) => {
  const [isHighlighting, setIsHighlighting] = useState(false)

  const deleteWordPair = (): void => {
    if (fields.length !== 1) {
      removePair()
    }
  }

  return (
    <Container highlightOnHover={isHighlighting} highlightColor={'#ff5252e3'}>
      <WordPairBlock>
        <FormWordInput inputValue={fields[index].en} index={index} lang='en' />
        <Dash>—</Dash>
        <FormWordInput inputValue={fields[index].ru} index={index} lang='ru' />
      </WordPairBlock>

      <DeletePairButton
        type='button'
        onClick={deleteWordPair}
        onMouseEnter={() => setIsHighlighting(true)}
        onMouseLeave={() => setIsHighlighting(false)}
      >
        <XLg size={30} />
      </DeletePairButton>
    </Container>
  )
}

const Container = styled(CardWordPairBlock)`
  display: flex;
  justify-content: space-between;
`
const WordPairBlock = styled.div`
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
