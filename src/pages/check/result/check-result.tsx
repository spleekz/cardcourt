import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CheckStoreContext } from '../page'
import { useStore } from '../../../stores/root-store/context'

export const CheckResult: React.FC = observer(() => {
  const { cardsStore } = useStore()
  const CheckStore = useContext(CheckStoreContext)

  return (
    <div>
      <Link to={'/'}>
        <button>На Card Court</button>
      </Link>
      <Link to={`/card/${cardsStore.card!._id}`}>
        <button>На карточку</button>
      </Link>
      <button onClick={() => CheckStore.setCheckMode('prepare')}>Повторить проверку</button>
    </div>
  )
})
