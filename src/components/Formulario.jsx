import React, {useState} from 'react';
import ListaTareas from './ListaTareas';
import { Form, Button } from 'react-bootstrap';

const Formulario = () => {
    const tareaVacia = {nombre:"", descripcion:""}; //prototipo

    const [tarea, setTarea] = useState(tareaVacia);
    const [listaTareas, setListaTareas] = useState([]);

    const submitTarea = (e)=>{
        e.preventDefault();
        setListaTareas([...listaTareas, tarea]);
        setTarea(tareaVacia); //fuerzo el borrado del formulario
    }

    const borrarTarea = (tareaPorBorrar)=>{
        let nuevaLista = listaTareas.filter((item)=>{return item.nombre!==tareaPorBorrar.nombre;});   
        setListaTareas(nuevaLista);     
    }

    return (
        <div>
            <h2>Nueva tarea</h2>
            <Form onSubmit={submitTarea}>
                <Form.Group className="mb-3" controlId="formTareaNombre">
                    <Form.Label>Tarea</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese nombre para la tarea" 
                        onChange={(e)=>setTarea({nombre:e.target.value.trimStart(), descripcion:tarea.descripcion})} 
                        value={tarea.nombre}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTareaDescripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese la descripción de la tarea" 
                        onChange={(e)=>setTarea({nombre:tarea.nombre, descripcion:e.target.value.trimStart()})}
                        value={tarea.descripcion}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Agregar
                </Button>
            </Form>
            <hr/>
            <h2>Lista de tareas</h2>
            <ListaTareas listaTareas={listaTareas} borrarTarea={borrarTarea}/>
        </div>
    );
};

export default Formulario;