//DEPENDENCIES
import {Routes,Route}from 'react-router'

//PAGES
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';


const App =()=>{
  return(
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/AboutPage' element={<AboutPage/>}/>
        <Route path='/LoginPage' element={<LoginPage/>}/>
        <Route path='/RegisterPage' element={<RegisterPage/>}/>
      </Routes>
    </>
  )
}

export default App;