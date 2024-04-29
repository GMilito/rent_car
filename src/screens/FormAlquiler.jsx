
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const FormAlquiler = () => {
    const [alquiler, setAlquiler] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [seguros, setSeguros] = useState([]);
    const [filtroCedula, setFiltroCedula] = useState('');

    const cargarClientes = () => {
        fetch('http://127.0.0.1:3001/clientes')
            .then(response => response.json())
            .then(data => {

                setClientes(data);
            })
            .catch(error => console.error("Error al obtener los datos:", error));
    };
    useEffect(() => {
        cargarClientes();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'filtroCedula') {
            setFiltroCedula(e.target.value);
        } else {
            setAlquiler({ ...alquiler, [e.target.name]: e.target.value });
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!alquiler.idCliente || !alquiler.fechaEntrega || !alquiler.horaEntrega || !alquiler.idSeguro) {
            console.error('Todos los campos son obligatorios');
            return;
        }


        // Definir una función auxiliar para insertar el cliente en una base de datos
        const insertarAlquiler = (url, vehiculoData) => {
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


        const datosAlquiler = {
            idCliente: alquiler.idTipoVehiculo,
            fechaEntrega: alquiler.idColor,
            horaEntrega: alquiler.horaEntrega,
            idSeguro: alquiler.idCombustible,
        };

        // Primero intentar insertar en SQL Server
        insertarAlquiler('http://127.0.0.1:3001/vehiculos', datosAlquiler)
            .then(data => {
                console.log('Alquiler agregado en SQL Server:', data);
                alert('Alquiler agregado con éxito');
                resetForm();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al agregar el alquiler. ' + error.message);
            });
    };




    const resetForm = () => {
        setAlquiler({ idCliente: '', fechaEntrega: '', horaEntrega: '', idSeguro: '' });
    };


    return (
        <ContenedorTabla>
            <h1>Crear Alquiler</h1>
            <FormContainer>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledLabel>Cliente:</StyledLabel>
                    <StyledInput
                        type="text"
                        name="filtroCliente"
                        placeholder="Buscar por cédula"
                        value={filtroCedula}
                        onChange={handleChange}

                    />
                    <StyledSelect
                        name="idCliente"
                        value={alquiler.idCliente}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un cliente</option>
                        {clientes
                            .filter(cliente => cliente.identificacion.includes(filtroCedula))
                            .map(cliente => (
                                <option key={cliente.id} value={cliente.id}>
                                    {`${cliente.identificacion} - ${cliente.nombre} ${cliente.apellidos}`}
                                </option>
                            ))}
                    </StyledSelect>
                    <StyledLabel>Fecha Entrega:</StyledLabel>
                    <StyledInput
                        type="date"
                        name="fechaEntrega"
                        value={alquiler.fechaEntrega}
                        onChange={handleChange}
                        placeholder="Fecha Entrega"
                        required
                    />
                    <StyledInput
                        type="time"
                        name="horaEntrega"
                        value={alquiler.horaEntrega}
                        onChange={handleChange}
                        placeholder="Hora Entrega"
                        required
                    />
                    <StyledLabel>Seguro:</StyledLabel>
                    <StyledSelect
                        name="idSeguro"
                        value={alquiler.idSeguro}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un Seguro</option>
                        {seguros
                            .map(cliente => (
                                <option key={cliente.idCliente} value={cliente.idCliente}>
                                    {`${cliente.cedula} - ${cliente.nombreCliente} ${cliente.apellidoCliente}`}
                                </option>
                            ))}
                    </StyledSelect>
                    <ContenedorBotones>
                        <BotonAgregar type="submit">Guardar</BotonAgregar>
                        <BotonCancelar as={Link} to="/AdmVehiculos">Cancelar</BotonCancelar>
                    </ContenedorBotones>
                </StyledForm>
            </FormContainer>
        </ContenedorTabla>
    );
};

export default FormAlquiler;



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