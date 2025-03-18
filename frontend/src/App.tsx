import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}> 
            <Route index element={<div className=''></div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
