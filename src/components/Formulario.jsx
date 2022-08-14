import React, {useState} from 'react';
import ListaTareas from './ListaTareas';
import { Form, Button } from 'react-bootstrap';

const Formulario = () => {
    const [tarea, setTarea] = useState({nombre:"", descripcion:""});

    const submitTarea = (e)=>{
        e.preventDefault();
        console.log(tarea)
    }

    return (
        <div>
            <Form onSubmit={submitTarea}>
                <Form.Group className="mb-3" controlId="formTareaNombre">
                    <Form.Label>Tarea</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese nombre para la tarea" 
                        onChange={(e)=>setTarea({nombre:e.target.value.trim(), descripcion:tarea.descripcion})} 
                        value={tarea.nombre}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTareaDescripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese la descripción de la tarea" 
                        onChange={(e)=>setTarea({nombre:tarea.nombre, descripcion:e.target.value.trim()})}
                        value={tarea.descripcion}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <ListaTareas/>
        </div>
    );
};

export default Formulario;