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
                    tareas.map((item,posicion)=><tr key={item._id}>
                        <td>{item.nombre}</td>
                        <td>{item.descripcion}</td>
                        <td>
                            <Button variant="danger" onClick={()=>props.borrarTarea(item)}>Eliminar</Button>
                            <Button className="ms-2" variant="warning" onClick={()=>props.editarTarea(item)}>Editar</Button>
                        </td>
                    </tr>)
                }
            </tbody>
        </Table>    
    );
};

export default ListaTareas;