
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const FormVehiculo = () => {
    const [vehiculo, setVehiculo] = useState({ idTipo: '', idColor: '', idCombustible: '', año: '', idMarca: '', estado: 'Disponible', idTransmision: '' });
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

        if (!vehiculo.idTipoVehiculo || !vehiculo.idColor || !vehiculo.idCombustible || !vehiculo.año || !vehiculo.idMarca || !vehiculo.estado || !vehiculo.idTransmision) {
            console.error('Todos los campos son obligatorios');
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
            estado: 'Disponible',
            idTransmision: vehiculo.idTransmision,
        };

        // Primero intentar insertar en SQL Server
        insertarVehiculo('http://127.0.0.1:3001/vehiculos', datosVehiculo)
            .then(data => {
                console.log('Vehiculo agregado en SQL Server:', data);
                alert('Vehiculo agregado con éxito');
                resetForm();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al agregar el vehiculo. ' + error.message);
            });
    };




    const resetForm = () => {
        setVehiculo({ idTipoVehiculo: '', idColor: '', idCombustible: '', año: '', idMarca: '', estado: '', idTransmision: '' });
    };


    return (
        <ContenedorTabla>
            <h1>Crear Vehiculo</h1>
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
                        value={tarjeta.idCliente}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un cliente</option>
                        {clientes
                            .filter(cliente => cliente.cedula.includes(filtroCedula))
                            .map(cliente => (
                                <option key={cliente.idCliente} value={cliente.idCliente}>
                                    {`${cliente.cedula} - ${cliente.nombreCliente} ${cliente.apellidoCliente}`}
                                </option>
                            ))}
                    </StyledSelect>
                    <StyledLabel>Fecha Entrega:</StyledLabel>
                    <StyledInput
                        type="date"
                        name="fecha"
                        value={vehiculo.año}
                        onChange={handleChange}
                        placeholder="Fecha Entrega"
                        required
                    />
                    <StyledInput
                        type="time"
                        name="año"
                        value={vehiculo.año}
                        onChange={handleChange}
                        placeholder="Hora Entrega"
                        required
                    />
                    <StyledLabel>Marca:</StyledLabel>
                    <StyledSelect
                        name="idMarca"
                        value={vehiculo.idMarca}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una marca</option>
                        {marcas
                            .map((tv) => (
                                <option value={tv.idMarca}>{tv.nombreMarca}</option>
                            ))}
                    </StyledSelect>

                    <StyledLabel>Transmision:</StyledLabel>
                    <StyledSelect
                        name="idTransmision"
                        value={vehiculo.idTransmision}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un tipo</option>
                        {transmisiones
                            .map((tv) => (
                                <option value={tv.idTransmision}>{tv.tipoTransmision}</option>
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