
import './App.css';
import Forgot from './Pages/Forgot';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import {Routes,Route} from 'react-router-dom'
import Dashboard from './Pages/Dashboard';
import ChangePWD from './Pages/ChangePWD';
import AddCharts from './components/AddCharts';
import PageNotFound from './Pages/PageNotFound';
function App() {
  

  return (
    <div className="App">
      <Routes>
       <Route exact path='/' element={<Login />} />
         <Route path='/forgot' element={<Forgot />} />
        <Route path='/register' element={<SignUp />} />
        <Route path="/api/password-reset/:userid/:token" element={<ChangePWD />} />
        
        
        {/* dashboard routes */}
        <Route path="/dashboard" element={localStorage.getItem("token")?<Dashboard />:<Login />} />
        <Route path="/dashboard/company" element={localStorage.getItem("token")?<Dashboard />:<Login />} />
        <Route path="/dashboard/addin" element={localStorage.getItem("token")?<Dashboard />:<Login />} />
        <Route path="/dashboard/addout" element={localStorage.getItem("token")?<Dashboard />:<Login />} />
        <Route path="/dashboard/openbalance" element={localStorage.getItem("token")?<Dashboard />:<Login />} />
        <Route path="/dashboard/reports" element={localStorage.getItem("token")?<Dashboard />:<Login />} />
        <Route path="/dashboard/expenselist" element={localStorage.getItem("token")?<Dashboard />:<Login />} />
        <Route path="/dashboard/incomelist" element={localStorage.getItem("token")?<Dashboard />:<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </div>
  );
}

export default App;
