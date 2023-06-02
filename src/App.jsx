//DEPENDENCIES
import {Routes,Route}from 'react-router'

//PAGES
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

//COMPONENTS
import Header from './components/Header'
const App =()=>{
  return(
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/LoginPage' element={<LoginPage/>}/>
      </Routes>
    </>
  )
}

export default App;