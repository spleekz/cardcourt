import React from 'react'
import { observer } from 'mobx-react-lite'
import { FormCard } from '../../components/card/variants/form-card/form-card'
import { getCardWidthByHeight } from '../../utils/cards'
import { CurrentCardStore } from '../../stores/current-card-store'
import { CenteredPageContent } from '../../components/utility/styled'

interface Props {
  editedCardStore: CurrentCardStore
}

export const EditCardPageOriginalContent: React.FC<Props> = observer(({ editedCardStore }) => {
  const cardHeight = 780
  const cardWidth = getCardWidthByHeight(cardHeight)

  return (
    <>
      {editedCardStore.card && (
        <CenteredPageContent>
          <FormCard cardStore={editedCardStore} width={cardWidth} height={cardHeight} />
        </CenteredPageContent>
      )}
    </>
  )
})
