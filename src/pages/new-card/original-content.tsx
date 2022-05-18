import React from 'react'
import { observer } from 'mobx-react-lite'
import { FormCard } from '../../components/card/variants/form-card/form-card'
import { getCardWidthByHeight } from '../../utils/cards'
import { CenteredPageContent } from '../../components/utility/styled'

export const NewCardPageOriginalContent: React.FC = observer(() => {
  const cardHeight = 780
  const cardWidth = getCardWidthByHeight(cardHeight)

  return (
    <CenteredPageContent>
      <FormCard width={cardWidth} height={cardHeight} />
    </CenteredPageContent>
  )
})
