import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CurrentUserStore } from '../stores/current-user-store'
import { useStore } from '../stores/root-store/context'

export const useUserStoreFromUrl = (): CurrentUserStore => {
  const { createCurrentUserStore } = useStore()
  const { userName } = useParams() as { userName: string }

  const [userStore] = useState(() => createCurrentUserStore(userName))

  return userStore
}
