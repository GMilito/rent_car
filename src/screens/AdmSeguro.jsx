// En /screens/AdmClientes.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';



const AdmSeguro = () => {
  const [seguros, setSeguros] = useState([]);

  const cargarSeguros = () => {
    fetch('http://127.0.0.1:3001/seguros')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Esto debería mostrar los datos en la consola
        setSeguros(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  useEffect(() => {
    cargarSeguros();
  }, []);

  const handleDelete = async (idSeguro) => {
    const confirmar = window.confirm("¿Realmente desea eliminar el registro seleccionado?");
    
    if (!confirmar) {
      return;
    }
    try {
      // Usa el nuevo endpoint que maneja ambas bases de datos
      const url = `http://127.0.0.1:3001/seguro/${idSeguro}`;
      const response = await fetch(url, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Falló la solicitud de eliminación');
      console.log('Seguro eliminado:', data.message);
      // Actualiza el estado de clientes en la UI después de la eliminación exitosa
      setSeguros(prevSeguros => prevSeguros.filter(seguro => seguro.idSeguro !== idSeguro));
    } catch (error) {
      console.error('Error al eliminar el Seguro:', error);
      alert(`Error al eliminar el seguro: ${error.message}`);
    }
  };
  
  /*NO BORRAR SE CAE
  const handleActualizarCliente = (clienteActualizado) => {
    // Función auxiliar para realizar la actualización en una base de datos
    const actualizarEnBaseDeDatos = (url) => {
      return fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteActualizado),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el cliente');
        }
        return response.json();
      });
    };
  
    // Actualizar en SQL Server
    actualizarEnBaseDeDatos(`http://127.0.0.1:3001/clientes-sql/${clienteActualizado.id}`)
      .then(() => {
        console.log('Cliente actualizado en SQL Server');
        
      })
      .catch(error => console.error('Error al actualizar en SQL Server:', error));
  
    // Actualizar en MySQL
    actualizarEnBaseDeDatos(`http://127.0.0.1:3001/clientes-mysql/${clienteActualizado.id}`)
      .then(() => {
        console.log('Cliente actualizado en MySQL');
        
      })
      .catch(error => console.error('Error al actualizar en MySQL:', error));
  
    // Opcional: actualiza el estado de la lista de clientes si ambas operaciones son independientes
    // y no necesitas confirmar que ambas fueron exitosas para actualizar el estado
    const indice = clientes.findIndex(cliente => cliente.id === clienteActualizado.id);
    const clientesActualizados = [...clientes];
    clientesActualizados[indice] = clienteActualizado;
    setClientes(clientesActualizados);
  };
  
*/
  return (
    <ContenedorTabla>
      <h1>Administación de Seguros</h1>
      <BotonAgregar as={Link} to="/AdmSeguro/FormSeguro">Nuevo</BotonAgregar>
      <Table>
        <thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nombre</Th>
            <Th>Monto</Th>
            <Th></Th>
          </Tr>
        </thead>
        <tbody>
        {seguros
          .map((seguro) => (
            <Tr key={seguro.idSeguro}>
              <Td>{seguro.idSeguro}</Td>
              <Td>{seguro.tipoSeguro}</Td>
              <Td>{seguro.montoSeguro}</Td>
              <Td>
                <BotonAccionEliminar onClick={() => handleDelete(seguro.idSeguro)}>Eliminar</BotonAccionEliminar>
              </Td>
            </Tr>
        ))}
        </tbody>
      </Table>
    </ContenedorTabla>
  );
};

export default AdmSeguro;

// Styled-components para la tabla, ajusta según tus necesidades
// Estilos de los componentes
const StyledInput = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin:10px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
const BotonAccion = styled.button`
  padding: 5px 10px;
  text-decoration:none;
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

const BotonAccionEliminar = styled(BotonAccion)`
  background-color: #FF6347; /* Rojo */
  color: white;

  &:hover {
    background-color: #E55347; /* Un rojo un poco más oscuro al pasar el mouse */
  }
`;

const BotonAccionModificar = styled(BotonAccion)`
  background-color: #FFA500; /* Naranja */
  color: white;

  &:hover {
    background-color: #cc8400; /* Un naranja un poco más oscuro al pasar el mouse */
  }
`;
const BotonCerrar = styled.button`
  background-color: #FF6347;
  color: white; 
  padding: 10px 20px;  
  border: none; 
  cursor: pointer; 
  font-size: 1rem;
  font-weight: bold;
  
  &:hover {
    opacity: 0.8;
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

const ModalContainer = styled.div`
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1000;

  > div {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;
const ContenedorTabla = styled.div`
  padding:50px;

`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border:1px solid #7c7c7c;
  border-radius: 25px;

`;

const Th = styled.th`
  text-align: left;
  background-color: #f2f2f2;
  padding: 8px;
`;

const Td = styled.td`
  padding: 8px;
  text-align: left;
`;

const Tr = styled.tr`

  &:nth-child(even) {
    background-color: #f9f9f9;
    border-bottom: 1px solid #7c7c7c inherit;
  }
`;
