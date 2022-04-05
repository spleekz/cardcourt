import React, { RefObject } from 'react'
import { FieldArrayWithId } from 'react-hook-form'
import styled from 'styled-components'
import { SendedCard, SendedCardWords } from '../../../../../api/api'
import { FormWordPair } from './word-pair'

//!WordList
interface PropsForWords {
  fields: FieldArrayWithId<SendedCard, 'words', 'id'>[]
  watchedFields: SendedCardWords
  remove: (index: number) => void
  bodyColor: string
}
const FormCardWords: React.FC<PropsForWords> = ({
  fields,
  bodyColor,
  remove,
  watchedFields,
}) => {
  return (
    <>
      {fields.map((words, index) => {
        return (
          <FormWordPair
            key={words.id}
            removePair={() => remove(index)}
            fields={watchedFields}
            index={index}
            color={bodyColor}
          />
        )
      })}
    </>
  )
}

//!Body
interface PropsForBody extends PropsForWords {
  topRef: RefObject<HTMLDivElement>
  anchorRef: RefObject<HTMLDivElement>
  addNewWordPair(): void
  headColor: string
}
export const FormCardBody: React.FC<PropsForBody> = ({
  fields,
  bodyColor,
  headColor,
  remove,
  watchedFields,
  topRef,
  anchorRef,
  addNewWordPair,
}) => {
  return (
    <>
      <div
        ref={topRef}
        style={{
          height: '10px',
        }}
      />

      <FormCardWords
        fields={fields}
        bodyColor={bodyColor}
        remove={remove}
        watchedFields={watchedFields}
      />

      <AddWordPairButtonContainer ref={anchorRef}>
        <AddWordPairButton color={headColor} type='button' onClick={addNewWordPair}>
          +
        </AddWordPairButton>
      </AddWordPairButtonContainer>
    </>
  )
}
const AddWordPairButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0 10px 0;
`
const AddWordPairButton = styled.button<{ color: string }>`
  width: 50%;
  font-size: 25px;
  font-weight: bold;
  border-radius: 5px;
  background-color: ${(props) => props.color};
`
