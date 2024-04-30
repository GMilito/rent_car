import React from 'react'
import styled from 'styled-components';
import clientes from '../img/clientes.webp';
import cuentas from '../img/cuentas.webp';
import tarjetas from '../img/tarjetas.webp';
import usuarios from '../img/usuarios.webp';
import { Link } from 'react-router-dom';

const Alquileres = () => {
  return (
    <ContenedorPrincipal>
      <ContenedorTitulo>

        <h2>Alquileres</h2>

      </ContenedorTitulo>
      <Contenedor>
        
      <BotonAgregar as={Link} to="/AdmVehiculos">Nuevo Alquiler</BotonAgregar>
        <br></br>
        <BotonAgregar as={Link} to="/Alquileres/AdmAlquileresActivos">Ver Alquileres Activos</BotonAgregar>
        <br></br>
        <BotonAgregar as={Link} to="/Alquileres/AdmHistorialAlquileres">Ver Historial de Alquileres</BotonAgregar>
        <br></br>


      </Contenedor>
      
    </ContenedorPrincipal>
  )
}

export default Alquileres

const BotonNavegar = styled.button`
  background-color: #273352; 
  text-decoration:none;
  color: white; 
  padding: 7px 15px;
  margin:10px;
  border: none; 
  border-radius:5px;
  cursor: pointer; 
  font-size: 1rem; 
  &:hover {
    opacity: 0.8;
  }
`;
const ImgPrincipal = styled.img`
  max-width:350px;
`;
const ContenedorPrincipal = styled.div`
padding:50px;
`;

const ContenedorTitulo = styled.div`
  display:flex;
  justify-content:center;
`;

const Contenedor = styled.div`
  margin-top:50px;
  display:flex;
  flex-flow: row nowrap;
  div{
    margin:50px;
  }
`;
const BotonAgregar = styled.button`
  background-color: #4CAF50; 
  text-decoration:none;
  color: white; 
  padding: 7px 15px;
  margin:10px;
  border: none; 
  border-radius:5px;
  cursor: pointer; 
  font-size: 1rem; 
  &:hover {
    opacity: 0.8;
  }
`;