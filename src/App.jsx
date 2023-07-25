//DEPENDENCIES
import { Routes, Route } from 'react-router'


//PAGES
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SettingsPage from './pages/SettingsPage';
import AdministrationPage from './pages/AdministrationPage';
import ManageUserPage from './pages/ManageUserPage'
import NoPermission from './pages/NoPermission';
//TESTS
import Address from './tests/Address';
import MyPage from './tests/MyPage'
import GlobalSearchSample from './tests/GlobalSearchSample/GlobalSearchSample'
import Calendar from './tests/FullCalendar/Calendar';
import FileUpload from './tests/fileUpload/FileUpload';
import ShoppingCart from './tests/shoppingCart/ShoppingCart'
// import UpdateCityTableWithZip from './tests/insertingData/UpdateCityTableWithZip';
import DataTable from './tests/CompleteDataTable/DataTable'
import ExcelImporter from './tests/ImportExcel/ExcelImporter';

// CSS
import './index.css'
import './css/App.css'


const App = () => {
  return (
    <>
      
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/AboutPage' element={<AboutPage />} />
          <Route path='/LoginPage' element={<LoginPage />} />
          <Route path='/RegisterPage' element={<RegisterPage />} />
          <Route path='SettingsPage' element={<SettingsPage />} />
          <Route path='AdministrationPage' element={<AdministrationPage />} />
          <Route path='ManageUserPage' element={<ManageUserPage />} />
          <Route path='/Address' element={<Address />} />
          <Route path='/MyPage' element={<MyPage />} />
          <Route path='/GlobalSearchSample' element={<GlobalSearchSample />} />
          <Route path='/Calendar' element={<Calendar />} />
          <Route path='/FileUpload' element={<FileUpload />} />
          <Route path='/NoPermission' element={<NoPermission />} />
          <Route path='/ShoppingCart' element={<ShoppingCart />} />
          {/* <Route path='/UpdateCityTableWithZip' element={<UpdateCityTableWithZip />} /> */}
          <Route path='/DataTable' element={<DataTable />} />
          <Route path='/ExcelImporter' element={<ExcelImporter />} />
          

        </Routes>
      
    </>
  )
}

export default App;