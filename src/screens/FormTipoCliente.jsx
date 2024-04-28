
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const FormTipoCliente = () => {
  const [tipoCliente, setTipoClientes] = useState({tipoCliente: ''});
  const handleChange = (e) => {
    setTipoClientes({ ...tipoCliente, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!tipoCliente.tipoCliente )  {
      console.error('Todos los campos son obligatorios');
      return;
    }
    // Definir una función auxiliar para insertar el cliente en una base de datos
    const insertarTipoCliente = (url, tipoClienteData) => {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tipoClienteData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
    };
  

    const datosTipoCliente = {
      tipoCliente: tipoCliente.tipoCliente,
    }
    // Primero intentar insertar en SQL Server
    insertarTipoCliente('http://127.0.0.1:3001/tipoCliente-sql', datosTipoCliente)
      .then(data => {
        console.log('Tipo cliente agregado en SQL Server:', data);
        // Aquí capturamos el idCliente devuelto por el backend
        const idTipoCliente = data.tipoCliente;
        console.log('ID del tipo de cliente agregado:', idTipoCliente);

       
        // Esto depende de cómo esté configurado tu backend para manejar estas inserciones
        datosTipoCliente.idTipoCliente = idTipoCliente;
  
        // Luego, si el primero tiene éxito, intentar insertar en MySQL (ajusta según tu lógica)
        return insertarTipoCliente('http://127.0.0.1:3001/tipoCliente-mysql', datosTipoCliente);
      })
      .then(data => {
        console.log('Marca agregado en MySQL:', data);
        alert('Tipo deCliente agregado con éxito en ambas bases de datos');
     
        resetForm(); 
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al agregar el tipo de cliente. ' + error.message);
      });
  };
  
  


const resetForm = () => {
    setTipoClientes({ tipoCliente: ''});
};


  return (
    <ContenedorTabla>
      <h1>Crear tipo de cliente</h1>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>Tipo:</StyledLabel>
          <StyledInput
            type="text"
            name="tipo"
            value={tipoCliente.tipoCliente}
            onChange={handleChange}
            placeholder="Tipo Cliente"
            required
          />
          <ContenedorBotones>
            <BotonAgregar type="submit">Guardar</BotonAgregar>
            <BotonCancelar as={Link} to="/AdmTipoCliente">Cancelar</BotonCancelar>
          </ContenedorBotones>
        </StyledForm>
      </FormContainer>
    </ContenedorTabla>
  );
};
export default FormTipoCliente;

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
