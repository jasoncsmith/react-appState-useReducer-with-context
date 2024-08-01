import { createContext, Dispatch, ReactNode, Reducer, useContext, useReducer } from 'react'

enum ACTION_TYPES {
  login = 'login',
  logout = 'logout',
  'user/nameChanged' = 'user/nameChanged',
}

interface User {
  name: string
  email: string
}

interface State {
  user: User | null
  dispatch: Dispatch<Action>
}

interface ActionLogin {
  type: typeof ACTION_TYPES.login
  payload: User
}

interface ActionChangeUserName {
  type: (typeof ACTION_TYPES)['user/nameChanged']
  payload: string
}

interface ActionLogout {
  type: typeof ACTION_TYPES.logout
}

type Action = ActionLogin | ActionLogout | ActionChangeUserName

const AppStateContext = createContext<null | State>(null)

const initialState: State = {
  user: null,
  dispatch: () => {},
}

function stateReducer(state: State, action: Action) {
  if (action.type === ACTION_TYPES.login) {
    return { ...state, user: { ...action.payload } }
  }

  if (action.type === ACTION_TYPES.logout) {
    return { ...state, user: null }
  }

  if (action.type === ACTION_TYPES['user/nameChanged']) {
    return state.user ? { ...state, user: { ...state.user, name: action.payload } } : state
  }

  return state
}

const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [appState, dispatch] = useReducer<Reducer<State, Action>>(stateReducer, initialState)

  return <AppStateContext.Provider value={{ ...appState, dispatch }}>{children}</AppStateContext.Provider>
}

const useAppStateContext = () => {
  const state = useContext(AppStateContext)

  if (!state) {
    throw new Error('state must be consumed within provider')
  }

  return state
}

export type { Action }
export { useAppStateContext, AppStateProvider, ACTION_TYPES }
