import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CheckStoreContext } from '../CheckPage'
import { useStore } from '../../../stores/RootStore/RootStoreContext'

export const ResultCheck: React.FC = observer((): JSX.Element => {
  const { CardsStore } = useStore()
  const CheckStore = useContext(CheckStoreContext)

  return (
    <div>
      <Link to={'/'}>
        <button>На Card Court</button>
      </Link>
      <Link to={`/card/${CardsStore.currentCard?.id}`}>
        <button>На карточку</button>
      </Link>
      <button onClick={() => CheckStore.checkMode.set('prepare')}>Повторить проверку</button>
    </div>
  )
})
