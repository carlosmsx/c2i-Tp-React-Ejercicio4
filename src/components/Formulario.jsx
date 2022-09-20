import React, { useState, useEffect } from "react";
import ListaTareas from "./ListaTareas";
import { Alert, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { cantidadCaracteres } from "./helpers";

const Formulario = () => {
    const URL_API = process.env.REACT_APP_URL_API;

    const tareaVacia = { nombre: "", descripcion: "" }; //prototipo

    const [tarea, setTarea] = useState(tareaVacia);
    const [listaTareas, setListaTareas] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [mensajeError, setMensajeError] = useState(false);

    useEffect(() => {
        queryAPI();
    }, []);

    const queryAPI = async () => {
        try {
            const response = await fetch(URL_API);
            const data = await response.json();
            if (response.status === 200) {
                setListaTareas(data);
            } else {
                console.log("queryAPI error");
            }
        } catch (error) {
            console.log("error al consultar la api");
        }
    };

    const submitTarea = (e) => {
        e.preventDefault();

        //validaciones
        if (cantidadCaracteres(tarea.nombre, 2, 30) && cantidadCaracteres(tarea.descripcion, 5, 100)) {
            setMensajeError(false);
        } else {
            setMensajeError(true);
            return;
        }

        if (modoEdicion) modificarTarea();
        else crearTarea();
    };

    const crearTarea = async () => {
        //enviar peticion a la API (create)
        try {
            const respuesta = await fetch(URL_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tarea),
            });

            if (respuesta.status === 201) {
                Swal.fire("Tarea creada", "La tarea fue agregada correctamente", "success");
                setTarea(tareaVacia); //fuerzo el borrado del formulario
                queryAPI();
            } else {
                throw new Error(respuesta.status);
            }
        } catch (error) {
            Swal.fire(
                "Error",
                "Se produjo un error intentando crear la tarea. Por favor espere unos minutos e intente nuevamente",
                "error"
            );
        }
    };

    const modificarTarea = async () => {
        //enviar peticion a la API (put)
        try {
            const respuesta = await fetch(URL_API + "/" + tarea._id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tarea),
            });

            if (respuesta.status === 200) {
                Swal.fire("Tarea modificada", "La tarea fue modificada correctamente", "success");
                setModoEdicion(false);
                setTarea(tareaVacia); //fuerzo el borrado del formulario
                queryAPI(); //recargo la lista
            } else {
                throw new Error(respuesta.status);
            }
        } catch (error) {
            Swal.fire(
                "Error",
                "Se produjo un error intentando modificar la tarea. Por favor espere unos minutos e intente nuevamente",
                "error"
            );
        }
    };

    const borrarTarea = async (tareaPorBorrar) => {
        setModoEdicion(false);
        setTarea(tareaVacia);
        Swal.fire({
            title: "Está seguro?",
            text: "no podrá deshacer esta operación!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Borrar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    //realizar peticion DELETE
                    const respuesta = await fetch(URL_API + "/" + tareaPorBorrar._id, {
                        method: "DELETE",
                    });

                    if (respuesta.status === 200) {
                        Swal.fire("Tarea eliminada!", "La tarea fue correctamente eliminada.", "success");
                    }
                    //recargar tabla de productos
                    queryAPI();
                } catch (error) {
                    Swal.fire(
                        "Error",
                        "Se produjo un error intentando eliminar la tarea. Por favor espere unos minutos e intente nuevamente",
                        "error"
                    );
                }
            }
        });
    };

    const editarTarea = async (tareaEditada) => {
        setModoEdicion(true);
        setTarea(tareaEditada);
    };

    const cancelarEdicion = () => {
        setModoEdicion(false);
        setTarea(tareaVacia);
    };

    return (
        <div>
            <h2>Nueva tarea</h2>
            <Form onSubmit={submitTarea}>
                <Form.Group className="mb-3" controlId="formTareaNombre">
                    <Form.Label>Tarea<small className="text-secondary"> (2 a 30 caracteres)</small></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese nombre para la tarea"
                        onChange={(e) =>
                            setTarea({ _id: tarea._id, nombre: e.target.value.trimStart(), descripcion: tarea.descripcion })
                        }
                        value={tarea.nombre}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTareaDescripcion">
                    <Form.Label>Descripción<small className="text-secondary"> (5 a 100 caracteres)</small></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese la descripción de la tarea"
                        onChange={(e) =>
                            setTarea({ _id: tarea._id, nombre: tarea.nombre, descripcion: e.target.value.trimStart() })
                        }
                        value={tarea.descripcion}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {modoEdicion ? "Guardar" : "Agregar"}
                </Button>
                {modoEdicion ? (
                    <Button className="ms-2" id="botonCancelar" variant="danger" onClick={cancelarEdicion}>
                        Cancelar
                    </Button>
                ) : null}
            </Form>
            {mensajeError === true ? <Alert className="my-3" variant="danger">Debe corregir los datos</Alert> : null} <hr />
            <h2>Lista de tareas</h2>
            <ListaTareas listaTareas={listaTareas} borrarTarea={borrarTarea} editarTarea={editarTarea} />
        </div>
    );
};

export default Formulario;
