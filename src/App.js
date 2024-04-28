
import './App.css';

import Navbar from './components/Navbar';
import AdmClientes from './screens/AdmClientes';
import AdmVehiculos from './screens/AdmVehiculos';
import Usuarios from './screens/Usuarios';
import Login from './screens/Login';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import { Navigate } from 'react-router-dom';

import FormCliente from './screens/FormCliente';
import FormClienteModificar from './screens/FormClienteModificar';
import Principal from './screens/Principal';
import FormVehiculo from './screens/FormVehiculo';
import FormVehiculoModificar from './screens/FormVehiculoModificar';


function AppWrapper() {
  const location = useLocation();

  return (
    <div>
      {/* Condición para no mostrar Navbar en la ruta de login */}
      {location.pathname !== '/login' && <Navbar />}
      <Routes>
          <Route path="/" element={localStorage.getItem('userToken') ? <Navigate replace to="/Principal" /> : <Navigate replace to="/login" />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/Principal' element={<Principal/>} />  
          <Route path='/Usuarios' element={<Usuarios/>} />
          <Route path='/AdmClientes' element={<AdmClientes/>} />
          <Route path="/AdmClientes/FormCliente" element={<FormCliente/>} />
          <Route path="/AdmClientes/FormClienteModificar/:idCliente" element={<FormClienteModificar/>} />
          <Route path='/AdmVehiculos' element={<AdmVehiculos/>} />
          <Route path="/AdmVehiculos/FormVehiculo" element={<FormVehiculo/>} />
          <Route path="/AdmVehiculos/FormVehiculoModificar/:id" element={<FormVehiculoModificar/>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
