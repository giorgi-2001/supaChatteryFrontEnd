import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate 
} from 'react-router-dom'
import Home from './pages/Home'
import Chats from './pages/Chats'
import Page404 from './pages/404'
import { useAuthContext } from './hooks/useAuthContext' 
import { useEffect } from 'react'

function App() {

  const { dispatch, user } = useAuthContext()

  useEffect(() => {
    const item = localStorage.getItem('user')
    dispatch({type: 'LOGIN', payload: JSON.parse(item)}) 
  }, [])

  const router = createBrowserRouter (
    createRoutesFromElements (
      <Route>
        <Route index element={!user ? <Home />: <Navigate to="/chats" />}/>
        <Route path="/chats" element={user ? <Chats /> : <Navigate to="/" />}  />
        <Route path="*" element={<Page404 />} />
      </Route>
    )
  )
  
  return (
    <main className="App">
      <RouterProvider router={router} />
    </main>
  )
}

export default App
