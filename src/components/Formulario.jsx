import React from 'react';
import ListaTareas from './ListaTareas';
import { Form, Button } from 'react-bootstrap';

const Formulario = () => {
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formTareaNombre">
                    <Form.Label>Tarea</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese nombre para la tarea" />
                    {/* <Form.Text className="text-muted">
                    Texto descriptivo del campo
                    </Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTareaDescripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese la descripción de la tarea" />
                    {/* <Form.Text className="text-muted">
                    Texto descriptivo del campo
                    </Form.Text> */}
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