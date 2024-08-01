import { ReactNode } from 'react'
import { faker } from '@faker-js/faker'

import { useAppStateContext, AppStateProvider, Action, ACTION_TYPES } from './hooks/useAppContext'

function changeUser() {
  return {
    name: faker.person.fullName(),
    email: `${faker.company.buzzAdjective().replace(/\s/g, '_').toLowerCase()}@${faker.company
      .name()
      .replace(/\s/g, '_')
      .toLowerCase()}.com`,
  }
}

const DisplayName = () => {
  const { user, dispatch } = useAppStateContext()

  function editName() {
    const newName = prompt('Please provide name you would like to change')

    if (newName?.trim()) {
      dispatch({
        type: ACTION_TYPES['user/nameChanged'],
        payload: newName.trim(),
      })
    }
  }

  return user ? (
    <div className="flex gap-2 items-center">
      <span>Welcome back, {user.name.split(' ')[0]}!</span>
      <button
        className="scale-150 text-blue-700 hover:bg-slate-800 p-1 rounded-md"
        type="button"
        onClick={editName}
      >
        ✏
      </button>
    </div>
  ) : (
    <div></div>
  )
}

const Button = ({ action, text }: { action: Action; text: string }) => {
  const { dispatch } = useAppStateContext()

  return (
    <button
      className="block text-white bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-sm transition-colors"
      type="button"
      onClick={() => dispatch(action)}
    >
      {text}
    </button>
  )
}

const Header = () => {
  const { user } = useAppStateContext()

  return (
    <header className="p-6 border-b-2 border-solid border-gray-700 text-white flex justify-between items-center">
      <DisplayName />
      {user ? (
        <Button
          text="Logout"
          action={{
            type: ACTION_TYPES.logout,
          }}
        />
      ) : (
        <Button
          text="Login"
          action={{
            type: ACTION_TYPES.login,
            payload: changeUser(),
          }}
        />
      )}
    </header>
  )
}

const hackStyle = {
  flex: '1 0 calc(33.333% - 1rem)',
}

const Component = ({ text }: { text: string }) => {
  const { user } = useAppStateContext()

  if (!user) {
    return null
  }

  return (
    <div
      className="block p-6 border-solid border-gray-600 bg-slate-950 rounded-md text-white"
      style={hackStyle}
    >
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p className="mt-6 ">{text}</p>
    </div>
  )
}

const AnotherComponent = ({ text }: { text: string }) => {
  const { user } = useAppStateContext()

  if (!user) {
    return null
  }

  return (
    <div
      className="block p-4 border-solid border-gray-600 bg-slate-950 rounded-md  text-white"
      style={hackStyle}
    >
      <h2>{user.name}</h2>
      <p className="mt-6 ">{text}</p>
    </div>
  )
}

const Main = ({ children }: { children: ReactNode }) => {
  return <main className={'min-w-96 mx-auto p-6 flex gap-4 flex-wrap'}>{children}</main>
}

const App = () => {
  return (
    <AppStateProvider>
      <div className="app w-[1024px] mx-auto">
        <Header />
        <Main>
          <Component text={faker.lorem.paragraph({ min: 1, max: 3 })} />
          <AnotherComponent text={faker.lorem.paragraph({ min: 2, max: 3 })} />
          <Component text={faker.lorem.paragraph({ min: 1, max: 3 })} />
          <AnotherComponent text={faker.lorem.paragraph({ min: 2, max: 3 })} />
          <Component text={faker.lorem.paragraph({ min: 1, max: 3 })} />
          <AnotherComponent text={faker.lorem.paragraph({ min: 2, max: 3 })} />
          <Component text={faker.lorem.paragraph({ min: 1, max: 3 })} />
          <AnotherComponent text={faker.lorem.paragraph({ min: 2, max: 3 })} />
          <Component text={faker.lorem.paragraph({ min: 1, max: 3 })} />
          <AnotherComponent text={faker.lorem.paragraph({ min: 2, max: 3 })} />
        </Main>
      </div>
    </AppStateProvider>
  )
}

export default App
