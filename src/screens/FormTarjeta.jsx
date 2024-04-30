
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const FormTarjeta = () => {
  const [tarjetas, setTarjetas] = useState({numeroTarjeta: '', PIN:'', CVV:'', fechaVencimiento:'', idCliente:'', idTipoTarjeta:''});
  const [tipoTarjetas, setTipoTarjetas] =useState([]) 

  const cargarTipoTarjeta = () => {
    fetch('http://127.0.0.1:3001/tipoTarjetas')
      .then(response => response.json())
      .then(data => {
        setTipoTarjetas(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
 

  useEffect(() => {
    cargarTipoTarjeta();
  }, []);



  const handleChange = (e) => {
    setTarjetas({ ...tarjetas, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tarjetas.numeroTarjeta || !tarjetas.PIN || !tarjetas.CVV || !tarjetas.fechaVencimiento || !tarjetas.idTipoTarjeta|| !tarjetas.idCliente) {
      console.error('Todos los campos son obligatorios');
      return;
    }


    // Definir una función auxiliar para insertar el cliente en una base de datos
    const insertarTarjeta = (url, tarjetaData) => {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarjetaData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        });
    };


    const datosTarjeta = {
      numeroTarjeta: tarjetas.numeroTarjeta,
      PIN: tarjetas.PIN ,
      CVV: tarjetas.CVV,
      fechaVencimiento: tarjetas.fechaVencimiento,
      idCliente: tarjetas.idCliente,
      idTipoTarjeta: tarjetas.idTipoTarjeta
    };

    // Primero intentar insertar en SQL Server
    insertarTarjeta('http://127.0.0.1:3001/tarjetas', datosTarjeta)
      .then(data => {
        console.log('Tarjetas agregado en SQL Server:', data);
        alert('Tarjetas agregado con éxito');
        resetForm();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al agregar la tarjeta. ' + error.message);
      });
  };

  const resetForm = () => {
    setTarjetas({ numeroTarjeta: '', PIN:'', CVV:'', fechaVencimiento:'', idCliente:'', idTipoTarjeta:''});
  };


  return (
    <ContenedorTabla>
      <h1>Crear Tarjeta</h1>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>Numero de Tarjeta:</StyledLabel>
          <StyledInput
            type="number"
            name="numeroTarjeta"
            value={tarjetas.numeroTarjeta}
            onChange={handleChange}
            placeholder="Numero de Tarjeta"
            required
          />
          <StyledLabel>PIN:</StyledLabel>
          <StyledInput
            type="number"
            name="PIN"
            value={tarjetas.PIN}
            onChange={handleChange}
            placeholder="PIN"
            required
          />
          <StyledLabel>CVV:</StyledLabel>
          <StyledInput
            type="number"
            name="CVV"
            value={tarjetas.CVV}
            onChange={handleChange}
            placeholder="CVV"
            required
          />
           <StyledLabel>Fecha Vencimiento:</StyledLabel>
          <StyledInput
            type="date"
            name="fechaVencimiento"
            value={tarjetas.fechaVencimiento}
            onChange={handleChange}
            placeholder="Fecha de vencimiento"
            required
          />
          <StyledLabel>Identificacion del Cliente:</StyledLabel>
          <StyledInput
            type="number"
            name="idCliente"
            value={tarjetas.idCliente}
            onChange={handleChange}
            placeholder="Identificacion Cliente"
            required
          />
          <StyledLabel>Tipo Tarjeta:</StyledLabel>
          <StyledSelect
            name="idTipoTarjeta"
            value={tarjetas.idTipoTarjeta}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tipo</option>
            {tipoTarjetas
              .map((tv) => (
                <option value={tv.idTipoTarjeta}>{tv.tipo}</option>
              ))}
          </StyledSelect>

          <ContenedorBotones>
            <BotonAgregar type="submit">Guardar</BotonAgregar>
            <BotonCancelar as={Link} to="/AdmTarjetas">Cancelar</BotonCancelar>
          </ContenedorBotones>
        </StyledForm>
      </FormContainer>
    </ContenedorTabla>
  );
};

export default FormTarjeta;

const ContenedorTabla = styled.div`
  padding:90px;

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