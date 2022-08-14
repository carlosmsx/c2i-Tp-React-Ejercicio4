import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ListaTareas = (props) => {
    const tareas=props.listaTareas;
    return (
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                <th>Tarea</th>
                <th>Descripción</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    tareas.map((item,posicion)=><tr>
                        <td>{tareas[posicion].nombre}</td>
                        <td>{tareas[posicion].descripcion}</td>
                        <td><Button variant="danger">Eliminar</Button></td>
                    </tr>)
                }
            </tbody>
        </Table>    
    );
};

export default ListaTareas;