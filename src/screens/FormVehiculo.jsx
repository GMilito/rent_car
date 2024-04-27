
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const FormVehiculo = () => {
  const [vehiculo, setVehiculo] = useState({ idTipo: '', idColor: '', idCombustible: '', año:'', idMarca:'', estado:'', idTransmision: ''});
  const [colores, setColores] = useState([])
  const [combustibles, setCombustibles] = useState([])
  const [transmisiones, setTransmisiones] = useState([])
  const [marcas, setMarcas] = useState([])
  const [tipoVehiculos, setTipoVehiculos] = useState([])

  const cargarColores = () => {
    fetch('http://127.0.0.1:3001/color')
      .then(response => response.json())
      .then(data => {
        setColores(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  const cargarCombustible = () => {
    fetch('http://127.0.0.1:3001/combustible')
      .then(response => response.json())
      .then(data => {
        setCombustibles(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  const cargarTransmisiones = () => {
    fetch('http://127.0.0.1:3001/transmision')
      .then(response => response.json())
      .then(data => {
        setTransmisiones(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  const cargarMarcas = () => {
    fetch('http://127.0.0.1:3001/marca')
      .then(response => response.json())
      .then(data => {
        setMarcas(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  const cargarTipoVehiculo = () => {
    fetch('http://127.0.0.1:3001/tipoVehiculo')
      .then(response => response.json())
      .then(data => {
        setTipoVehiculos(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };


  useEffect(() => {

    cargarColores();
    cargarCombustible();
    cargarTransmisiones();
    cargarMarcas();
    cargarTipoVehiculo();
  }, []);



  const handleChange = (e) => {
    setVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!vehiculo.idTipoVehiculo|| !vehiculo.idColor || !vehiculo.idCombustible || !vehiculo.año || !vehiculo.idMarca|| !vehiculo.estado || !vehiculo.idTransmision )  {
      console.error('Todos los campos son obligatorios');
      return;
    }

    if (!/^\d{10}$/.test(vehiculo.idVehiculo)) {
      alert("La Identificación debe tener exactamente 10 dígitos y solo debe contener números");
      return;
    }
  
    // Definir una función auxiliar para insertar el cliente en una base de datos
    const insertarVehiculo = (url, vehiculoData) => {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehiculoData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
    };
  

    const datosVehiculo = {
      idTipoVehiculo: vehiculo.idTipoVehiculo,
      idColor: vehiculo.idColor,
      idCombustible: vehiculo.idCombustible,
      año: vehiculo.año,
      idMarca: vehiculo.idMarca, 
      estado: vehiculo.estado,
      idTransmision: vehiculo.idTransmision,
    };
  
    // Primero intentar insertar en SQL Server
    insertarVehiculo('http://127.0.0.1:3001/vehiculos-sql', datosVehiculo)
      .then(data => {
        console.log('Vehiculo agregado en SQL Server:', data);
        // Aquí capturamos el idCliente devuelto por el backend
        const idVehiculo = data.idVehiculo;
        console.log('ID del vehiculo agregado:', idVehiculo);
  
        // Si necesitas usar el idCliente para la siguiente inserción en MySQL o para otro propósito
        // Asegúrate de incluir el idCliente en el objeto datosCliente si es necesario para la inserción en MySQL
        // Esto depende de cómo esté configurado tu backend para manejar estas inserciones
        datosVehiculo.idVehiculo = idVehiculo;
  
        // Luego, si el primero tiene éxito, intentar insertar en MySQL (ajusta según tu lógica)
        return insertarVehiculo('http://127.0.0.1:3001/vehiculos-mysql', datosVehiculo);
      })
      .then(data => {
        console.log('Vehiculo agregado en MySQL:', data);
        alert('Vehiculo agregado con éxito en ambas bases de datos');
     
        resetForm(); 
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al agregar el vehiculo. ' + error.message);
      });
  };
  
  


const resetForm = () => {
    setVehiculo({ idTipoVehiculo: '', idColor: '', idCombustible: '', año:'', idMarca:'', estado:'', idTransmision: ''});
};


  return (
    <ContenedorTabla>
      <h1>Crear Vehiculo</h1>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
        
          <StyledLabel>Tipo Vehiculo:</StyledLabel>
          <StyledSelect
            name="idTipoVehiculo"
            value={vehiculo.paisResidencia}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tipo</option>
            {tipoVehiculos
              .map((tv) => (
                <option value={tv.idTipo}>{tv.nombre}</option>
              ))}
          </StyledSelect>
          <StyledLabel>Color:</StyledLabel>
          <StyledInput
            type="text"
            name="idColor"
            value={vehiculo.idColor}
            onChange={handleChange}
            placeholder="Color"
            required
          />
          <StyledLabel>Combustible:</StyledLabel>
          <StyledInput
            type="text"
            name="idCombustible"
            value={vehiculo.idCombustible}
            onChange={handleChange}
            placeholder="Combustible"
            required
          />
          <StyledLabel>Año:</StyledLabel>
          <StyledInput
            type="text"
            name="año"
            value={vehiculo.año}
            onChange={handleChange}
            placeholder="año"
            required
          />
          <StyledLabel>Marca:</StyledLabel>
          <StyledInput
            type="text"
            name="idMarca"
            value={vehiculo.idMarca}
            onChange={handleChange}
            placeholder="Marca"
            required
          />
          <StyledLabel>Estado:</StyledLabel>
          <StyledInput
            type="text"
            name="estado"
            value={vehiculo.estado}
            onChange={handleChange}
            placeholder="estado"
            required
          />
          <StyledLabel>Transmision:</StyledLabel>
          <StyledInput
            type="text"
            name="idTransmision"
            value={vehiculo.idTransmision}
            onChange={handleChange}
            placeholder="Transmision"
            required
          />

          <ContenedorBotones>
            <BotonAgregar type="submit">Guardar</BotonAgregar>
            <BotonCancelar as={Link} to="/AdmVehiculos">Cancelar</BotonCancelar>
          </ContenedorBotones>
        </StyledForm>
      </FormContainer>
    </ContenedorTabla>
  );
};

export default FormVehiculo;



const ContenedorTabla = styled.div`
  padding:50px;

`;
const StyledLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;
const ContenedorBotones = styled.div`
  display:flex;
  flex-flow: row nowrap;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: #f8f8f8;
  justify-content:center;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled.form`
  display: flex;
  max-width:500px;
  flex-direction: column;
  gap: 15px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const BotonAccion = styled.button`
  text-decoration:none;
  font-weight:bold;
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const BotonCancelar = styled(BotonAccion)`
  background-color: #FF6347; 
  color: white;

  &:hover {
    background-color: #E55347; 
  }
`;
const BotonAgregar = styled(BotonAccion)`
  background-color: #007bff; 
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;
const StyledSelect = styled(StyledInput).attrs({ as: 'select' })``;