import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CheckStoreContext } from '../page'

export const CheckResult: React.FC = observer(() => {
  const CheckStore = useContext(CheckStoreContext)

  return (
    <div>
      <Link to={'/'}>
        <button>На Card Court</button>
      </Link>

      <Link to={`/}`}>
        <button>На карточку</button>
      </Link>

      <button onClick={() => CheckStore.setCheckMode('prepare')}>Повторить проверку</button>
    </div>
  )
})
