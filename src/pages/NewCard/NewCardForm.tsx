import React from 'react'
import styled from 'styled-components'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { IWordWithTranslate } from '../../stores/CardsStore'

const NewCardFormContainer = styled.div`
  width: 600px;
  height: 780px;
  padding: 15px 10px;
  background-color: #fdff;
`
const CardTitleInput = styled.input`
  background-color: transparent;
  border: 0;
  outline: none;
  font-size: 30px;
  width: 100%;
  font-weight: bold;
`
const NewCardAuthor = styled.div``
const NewCardWordsContainer = styled.div``
const NewCardWordsTitle = styled.div``
const NewCardWords = styled.div``
const FormWordPairContainer = styled.div`
  display: flex;
`
const FormWordPairInput = styled.input`
  width: 50%;
`
const AddWordPairButton = styled.button``
const DeleteWordPairButton = styled.button``
const SubmitButton = styled.button``

interface ICardForm {
  wordInputs: Array<IWordWithTranslate>
}

export const NewCardForm: React.FC = () => {
  const { register, control, handleSubmit } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'wordInputs',
  })
  const createNewCard: SubmitHandler<ICardForm> = (data) => {
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <NewCardFormContainer>
      <form onSubmit={handleSubmit(createNewCard)}>
        <CardTitleInput placeholder='Введите название карточки'></CardTitleInput>
        <NewCardAuthor>spleekz</NewCardAuthor>
        <NewCardWordsContainer>
          <NewCardWordsTitle>Список слов</NewCardWordsTitle>
          <NewCardWords>
            {fields.map((wordInput, index) => {
              return (
                <FormWordPairContainer key={wordInput.id}>
                  <FormWordPairInput
                    {...register(`wordInputs.${index}.en` as const, { required: true })}
                    placeholder='Слово на английском'
                  />
                  <FormWordPairInput
                    {...register(`wordInputs.${index}.ru` as const, { required: true })}
                    placeholder='Перевод'
                  />
                  <DeleteWordPairButton onClick={() => remove(index)}>DE</DeleteWordPairButton>
                </FormWordPairContainer>
              )
            })}
          </NewCardWords>
          <AddWordPairButton onClick={() => append({ en: '', ru: '' })}>
            добавить пару
          </AddWordPairButton>
          <SubmitButton type='submit'>сабмит</SubmitButton>
        </NewCardWordsContainer>
      </form>
    </NewCardFormContainer>
  )
}
