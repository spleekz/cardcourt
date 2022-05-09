import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { useStore } from '../../../../stores/root-store/context'
import { AskToDoAuth } from './ask-to-do-auth'
import { HeaderUserAvatar } from './header-user-avatar'

export const HeaderRightSide: React.FC = observer(() => {
  const { appStore, authStore } = useStore()

  return (
    <Container>
      {authStore.token ? <HeaderUserAvatar /> : !appStore.onAuthPage && <AskToDoAuth />}
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-left: 35px;
`
