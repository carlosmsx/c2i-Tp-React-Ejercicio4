import React, {useState} from 'react';
import ListaTareas from './ListaTareas';
import { Form, Button } from 'react-bootstrap';

const Formulario = () => {
    const [tarea, setTarea] = useState({});

    const submitTarea = (e)=>{
        e.preventDefault();
        console.log("submit")
    }

    return (
        <div>
            <Form onSubmit={submitTarea}>
                <Form.Group className="mb-3" controlId="formTareaNombre">
                    <Form.Label>Tarea</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese nombre para la tarea" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTareaDescripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese la descripción de la tarea" />
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