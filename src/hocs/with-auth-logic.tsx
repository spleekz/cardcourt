import { observer } from 'mobx-react-lite'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ScreenPreloader } from '../assets/svg/components/screen-preloader'
import { LoginStore } from '../stores/auth-store/login-store'
import { RegistrationStore } from '../stores/auth-store/registration-store'
import { useStore } from '../stores/root-store/context'

interface AuthContextValue {
  login: LoginStore
  registration: RegistrationStore
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)
export const useAuthContext = (): AuthContextValue => useContext(AuthContext)

export const withAuthLogic = (Component: React.FC): React.FC => {
  const ComponentWithAuthLogic: React.FC = observer(() => {
    const { authStore } = useStore()
    const location = useLocation()
    const navigate = useNavigate()

    const [registrationStore] = useState(() => authStore.createRegistrationStoreWithLoadingState())
    const [loginStore] = useState(() => authStore.createLoginStoreWithLoadingState())
    const authContextValue: AuthContextValue = {
      registration: registrationStore,
      login: loginStore,
    }

    useEffect(() => {
      if (registrationStore.loadingState.success || loginStore.loadingState.success) {
        const redirectPath = location.state?.prevPath || '/'
        navigate(redirectPath)
      }
    }, [registrationStore.loadingState.success, loginStore.loadingState.success])

    return (
      <>
        <AuthContext.Provider value={authContextValue}>
          <Component />
        </AuthContext.Provider>

        {(registrationStore.loadingState.loading || loginStore.loadingState.loading) && (
          <ScreenPreloader blackout={true} />
        )}
      </>
    )
  })

  return ComponentWithAuthLogic
}
