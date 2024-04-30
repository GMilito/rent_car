import React from 'react'
import styled from 'styled-components';
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
        <h3> Administración de clientes</h3>
          <p>Esta función permite gestionar la información de los clientes de manera eficiente y ordenada. Al usarla,
            podrás ver un listado completo de tus clientes con detalles como su ID, nombre y apellido. Si necesitas
            agregar un nuevo cliente, simplemente usa el botón “Nuevo” para ingresar sus datos en un formulario.
            También puedes editar la información de cualquier cliente haciendo clic en su ID, lo que te llevará
            a una pantalla donde podrás modificar sus datos y guardar los cambios. Además, si necesitas eliminar
            un cliente, esta función te ofrece una manera segura de hacerlo, solicitándote confirmación para evitar
            borrados accidentales. En caso de que el cliente no pueda ser eliminado por tener datos asociados,
            la función te informará, garantizando así la integridad de tu base de datos.</p>
          <BotonNavegar as={Link} to="/AdmClientes">IR</BotonNavegar>
        </TextoSeccion>
      </Seccion>

      <Seccion>
        <TextoSeccion>
          <h3> Administracion de vehiculos</h3>
          <p>Esta función es una herramienta de administración de cuentas diseñada para facilitar
            el manejo eficaz de la información financiera de los clientes. Permite visualizar un
            listado detallado de todas las cuentas, incluyendo el número de cuenta, saldo actual,
            ID del cliente y su nombre completo. Ofrece una opción para agregar nuevas cuentas a
            través de un botón “Nuevo”, donde se puede registrar una cuenta automáticamente generando
            su número, definir un monto de depósito inicial, y vincularla a un cliente mediante su ID,
            mostrando también el nombre del cliente para confirmación. Las cuentas existentes se pueden
            editar fácilmente mediante un enlace en su número, con opciones para guardar los cambios o
            cancelar. Además, se facilita la eliminación de cuentas con un botón específico que solicita
            confirmación para proceder, asegurando la eliminación solo si no existen datos asociados que
            lo impidan, garantizando así la integridad de la gestión de cuentas.</p>
          <BotonNavegar as={Link} to="/AdmVehiculos">IR</BotonNavegar>
        </TextoSeccion>
        <ImgPrincipal src={vehiculos} alt="" />
      </Seccion>

      <Seccion>
        <ImgPrincipal src={alquiler} alt="" />
        <TextoSeccion>
          <h3>Realizar Alquiler </h3>
          <p>Esta función permite gestionar la información de los clientes de manera eficiente y ordenada. Al usarla,
            podrás ver un listado completo de tus clientes con detalles como su ID, nombre y apellido. Si necesitas
            agregar un nuevo cliente, simplemente usa el botón “Nuevo” para ingresar sus datos en un formulario.
            También puedes editar la información de cualquier cliente haciendo clic en su ID, lo que te llevará
            a una pantalla donde podrás modificar sus datos y guardar los cambios. Además, si necesitas eliminar
            un cliente, esta función te ofrece una manera segura de hacerlo, solicitándote confirmación para evitar
            borrados accidentales. En caso de que el cliente no pueda ser eliminado por tener datos asociados,
            la función te informará, garantizando así la integridad de tu base de datos.</p>
          <BotonNavegar as={Link} to="/Alquileres">IR</BotonNavegar>
        </TextoSeccion>
      </Seccion>

      <Seccion>
        <TextoSeccion>
          <h3>Administracion de Catalogos</h3>
          <p>Esta función permite gestionar la información de los clientes de manera eficiente y ordenada. Al usarla,
            podrás ver un listado completo de tus clientes con detalles como su ID, nombre y apellido. Si necesitas
            agregar un nuevo cliente, simplemente usa el botón “Nuevo” para ingresar sus datos en un formulario.
            También puedes editar la información de cualquier cliente haciendo clic en su ID, lo que te llevará
            a una pantalla donde podrás modificar sus datos y guardar los cambios. Además, si necesitas eliminar
            un cliente, esta función te ofrece una manera segura de hacerlo, solicitándote confirmación para evitar
            borrados accidentales. En caso de que el cliente no pueda ser eliminado por tener datos asociados,
            la función te informará, garantizando así la integridad de tu base de datos.</p>
          <BotonNavegar as={Link} to="/Catalogos">IR</BotonNavegar>
        </TextoSeccion>
        <ImgPrincipal src={catalogo} alt="" />
      </Seccion>
    </ContenedorPrincipal>
  )
}

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
const TituloSecundario = styled.h3`
  font-size: 1.8rem;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
  color: #4CAF50; /* Cambia el color según tus preferencias */
  margin-bottom: 20px;
`;

const ImgPrincipal = styled.img`
  max-width: 350px;
`;

const ContenedorPrincipal = styled.div`
  padding: 50px;
`;

const ContenedorTitulo = styled.div`
  display: flex;
  justify-content: center;
`;

const Seccion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;


const TituloPrincipal = styled.h2`
  font-size: 2.5rem;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  color: #273352;
  margin-bottom: 30px;
`;
const TextoSeccion = styled.div`
  margin: 0 50px;
  text-align: left;
`;
