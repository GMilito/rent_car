import React from 'react'
import styled, { keyframes } from 'styled-components';

import clientes from '../img/satisfaccion-del-consumidor.png';
import vehiculos from '../img/vehiculos.png';
import alquiler from '../img/clave.png';
import catalogo from '../img/revista.png';



import { Link } from 'react-router-dom';

const Principal = () => {
  return (
    <ContenedorPrincipal>
      <ContenedorTitulo>
        <TituloPrincipal>Bienvenido </TituloPrincipal>
      </ContenedorTitulo>
      <Seccion>
        <ImgPrincipal src={clientes} alt="" />
        <TextoSeccion>
          <TituloSecundario>Administración de clientes</TituloSecundario>
          <DescripcionSeccion>
            Gestiona fácilmente la información de tus clientes, desde ver un listado completo hasta agregar, editar o eliminar clientes de forma segura.
          </DescripcionSeccion>
          <br />
          <BotonNavegar as={Link} to="/AdmClientes">IR</BotonNavegar>
        </TextoSeccion>
      </Seccion>

      <Seccion>
        <TextoSeccion>
          <TituloSecundario>Administración de vehículos</TituloSecundario>
          <DescripcionSeccion>
            Administra tus vehículos de manera eficiente, con funciones para agregar nuevas cuentas, editar detalles existentes y eliminar cuentas de forma segura.
          </DescripcionSeccion>
          <br />
          <BotonNavegar as={Link} to="/AdmVehiculos">IR</BotonNavegar>
        </TextoSeccion>
        <ImgPrincipal src={vehiculos} alt="" />
      </Seccion>

      <Seccion>
        <ImgPrincipal src={alquiler} alt="" />
        <TextoSeccion>
          <TituloSecundario>Realizar Alquiler</TituloSecundario>
          <DescripcionSeccion>
            Simplifica la gestión de alquileres de automotores con esta función, que te permite agregar, editar y eliminar alquileres al igual que .
          </DescripcionSeccion>
          <br />
          <BotonNavegar as={Link} to="/Alquileres">IR</BotonNavegar>
        </TextoSeccion>
      </Seccion>

      <Seccion>
        <TextoSeccion>
          <TituloSecundario>Administración de Catálogos</TituloSecundario>
          <DescripcionSeccion>
            Gestiona tus catálogos de características de los automotores de manera organizada, con funciones para agregar, editar y eliminar características fácilmente.
          </DescripcionSeccion>
          <br />
          <BotonNavegar as={Link} to="/Catalogos">IR</BotonNavegar>
        </TextoSeccion>
        <ImgPrincipal src={catalogo} alt="" />
      </Seccion>
    </ContenedorPrincipal>
  );
};

export default Principal;

const BotonNavegar = styled.button`
  background-color: #273352;
  text-decoration: none;
  color: white;
  padding: 12px 24px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: opacity 0.3s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;
const moveInRight = keyframes`
0% {
  transform: translateY(0); /* Comienza sin desplazamiento */
}
50% {
  transform: translateY(-10px); /* Desplazamiento hacia arriba */
}
100% {
  transform: translateY(0); /* Vuelve a la posición inicial */
}
`;
const TituloSecundario = styled.h3`
  font-size: 1.8rem;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
  color: #273352; /* Cambia el color según tus preferencias */
  margin-bottom: 20px;
`;

const ImgPrincipal = styled.img`
  max-width: 300px;
`;

const ContenedorPrincipal = styled.div`
  padding: 50px;
`;

const ContenedorTitulo = styled.div`
  display: flex;
  justify-content: center;
  animation: ${moveInRight} 1s ease-out;
`;

const Seccion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2px;
`;


const TituloPrincipal = styled.h2`
  margin-top: 80px;
  font-size: 2.5rem;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  color: #273352;
  margin-bottom: 30px;
`;

const TextoSeccion = styled.div`
  margin: 0 50px;
  margin-top: -12px;
  text-align: left;
`;

const DescripcionSeccion = styled.p`
  padding: 20px;
  margin-bottom: 10px;
  font-size:17px;
`;
