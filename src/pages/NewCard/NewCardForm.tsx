import React from 'react'
import styled from 'styled-components'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { IWordWithTranslate } from '../../stores/CardsStore'
import { CardContainer, CardAuthor, CardWords, CardHeading } from '../Cards/CardElement'
import { XIcon } from '../../svg/XIcon'

const NewCardFormContainer = styled(CardContainer)`
  width: 500px;
  height: 780px;
`
const CardForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const NewCardHeading = styled(CardHeading)`
  padding: 15px 15px 0 15px;
`
const CardNameInput = styled.input`
  background-color: transparent;
  border: 0;
  outline: none;
  width: 100%;
  font-weight: bold;
  font-size: 32px;
`
const NewCardAuthor = styled(CardAuthor)``
const NewCardWordsContainer = styled(CardWords)`
  min-height: initial;
  max-height: 650px;
  flex: 1 0 auto;
  padding: 10px 15px;
  border-radius: 16px;
  overflow-y: auto;
`
const NewCardWords = styled.div``
const FormWordPairContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`
const FormWordPair = styled.div`
  width: 93%;
  display: flex;
  justify-content: space-between;
`
const FormWordPairInput = styled.input`
  width: 48%;
  padding: 3px;
  font-size: 20px;
  ::placeholder {
    font-size: 18px;
  }
`
const AddWordPairButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`
const AddWordPairButton = styled.button`
  width: 50%;
  background-color: pink;
  font-size: 25px;
  font-weight: bold;
  border-radius: 5px;
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
const SubmitButton = styled.button`
  width: 100%;
  background-color: pink;
  font-size: 28px;
  padding: 4px;
  font-weight: bold;
  position: relative;
  z-index: 1000;
`
const Dash = styled.span`
  align-self: center;
  margin: 0 5px;
`

interface ICardForm {
  cardName: string
  wordInputs: Array<IWordWithTranslate>
}

export const NewCardForm: React.FC = () => {
  const { register, control, handleSubmit } = useForm<ICardForm>({
    defaultValues: {
      wordInputs: [{ en: '', ru: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'wordInputs',
  })

  const deleteWordPair = (index: number): void => {
    if (fields.length !== 1) {
      remove(index)
    }
  }
  const createNewCard: SubmitHandler<ICardForm> = (data) => {
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <NewCardFormContainer color='pink'>
      <CardForm onSubmit={handleSubmit(createNewCard)}>
        <NewCardHeading color='pink'>
          <CardNameInput
            {...register(`cardName` as const, { required: true })}
            placeholder='Введите название карточки'
            maxLength={27}
          />
          <NewCardAuthor>spleekz</NewCardAuthor>
        </NewCardHeading>
        <NewCardWordsContainer color='aqua' isHover={false}>
          <NewCardWords>
            {fields.map((wordInput, index) => {
              return (
                <FormWordPairContainer key={wordInput.id}>
                  <FormWordPair>
                    <FormWordPairInput
                      {...register(`wordInputs.${index}.en` as const, { required: true })}
                      placeholder='Слово на английском'
                    />
                    <Dash>—</Dash>
                    <FormWordPairInput
                      {...register(`wordInputs.${index}.ru` as const, { required: true })}
                      placeholder='Перевод'
                    />
                  </FormWordPair>
                  <DeleteWordPairButton onClick={() => deleteWordPair(index)}>
                    <XIcon />
                  </DeleteWordPairButton>
                </FormWordPairContainer>
              )
            })}
          </NewCardWords>
          <AddWordPairButtonContainer>
            <AddWordPairButton onClick={() => append({ en: '', ru: '' })}>+</AddWordPairButton>
          </AddWordPairButtonContainer>
        </NewCardWordsContainer>
        <SubmitButton type='submit'>Создать карточку</SubmitButton>
      </CardForm>
    </NewCardFormContainer>
  )
}
