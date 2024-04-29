
import './App.css';

import Navbar from './components/Navbar';
import AdmClientes from './screens/AdmClientes'; 
import AdmVehiculos from './screens/AdmVehiculos';
import AdmColores from './screens/AdmColores';
import Usuarios from './screens/Usuarios';
import Login from './screens/Login';
import FormColor from './screens/FormColor';
import Alquileres from './screens/Alquileres';
import AdmAlquileresActivos from './screens/AdmAlquileresActivos';
import AdmHistorialAlquileres from './screens/AdmHistorialAlquileres';
import AdmMarcas from './screens/AdmMarcas';
import FormMarca from './screens/FormMarca';
import AdmPaisResidencia from './screens/AdmPaisResidencia';
import FormPaisResidencia from './screens/FormPaisResidencia';
import AdmCombustibles from './screens/AdmCombustibles';
import FormCombustible from './screens/FormCombustible';

import Catalogos from './screens/Catalogos';






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
import FormColorModificar from './screens/FormColorModificar';
import FormMarcaModificar from './screens/FormMarcaModificar';
import FormPaisModificar from './screens/FormPaisModificar';
import FormCombustibleModificar from './screens/FormCombustibleModificar';

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
          <Route path='/Catalogos' element={<Catalogos/>} />
          <Route path='/Alquileres' element={<Alquileres/>} />
          <Route path='/Alquileres/AdmAlquileresActivos' element={<AdmAlquileresActivos/>} />
          <Route path='/Alquileres/AdmHistorialAlquileres' element={<AdmHistorialAlquileres/>} />
          <Route path='/AdmClientes' element={<AdmClientes/>} />
          <Route path='/AdmColores' element={<AdmColores/>} />
          <Route path='/AdmColores/FormColor' element={<FormColor/>} />
          <Route path='/AdmColores/FormColorModificar/:idColor' element={<FormColorModificar/>}/>
          <Route path="/AdmClientes/FormCliente" element={<FormCliente/>} />
          <Route path="/AdmClientes/FormClienteModificar/:idCliente" element={<FormClienteModificar/>} />
          <Route path='/AdmVehiculos' element={<AdmVehiculos/>} />
          <Route path="/AdmVehiculos/FormVehiculo" element={<FormVehiculo/>} />
          <Route path="/AdmVehiculos/FormVehiculoModificar/:id" element={<FormVehiculoModificar/>} />
          <Route path="/AdmMarcas" element={<AdmMarcas/>} />
          <Route path="/AdmMarcas/FormMarca" element={<FormMarca/>} />
          <Route path="/AdmMarcas/FormMarcaModificar/:idMarca" element={<FormMarcaModificar/>} />
          <Route path="/AdmPaisResidencia" element={<AdmPaisResidencia/>} />
          <Route path="/AdmPaisResidencia/FormPaisResidencia" element={<FormPaisResidencia/>} />
          <Route path="/AdmPaisResidencia/FormPaisModificar/:idPais" element={<FormPaisModificar/>}/>
          <Route path="/AdmCombustibles" element={<AdmCombustibles/>} />
          <Route path="/AdmCombustibles/FormCombustible" element={<FormCombustible/>} />
          <Route path="/AdmCombustibles/FormCombustibleModificar/:idCombustible" element={<FormCombustibleModificar/>}/>
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
