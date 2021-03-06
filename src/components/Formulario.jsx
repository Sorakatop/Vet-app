import React, {Fragment, useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
    //crear state de citas
    const[cita,setCita] = useState({
        //seleccionamos el name de los inputs
        mascota:'',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
    });

    const [ error, setErrors ] = useState(false)


    //funcion que se ejecuta cada vez que el usuario escribe en el input
    const handleChange = e => {
       //llamar al segundo valor de useState
        setCita({
            ...cita, //copiamos el objeto
            [e.target.name]: e.target.value  // y sobrescribimos la copia
        })
    }



    //extraer valores

    const {mascota, propietario,fecha,hora,sintomas} = cita

    //al enviar formulario
    const submitCita = e =>{
        e.preventDefault();
        //validar
        if(mascota.trim()==='' || propietario.trim()===''|| fecha.trim()==='' || hora.trim()==='' || sintomas.trim()===''){
            setErrors(true)
            return //para que no se siga ejecutando
        }

       // Eliminar mensaje de error
       setErrors(false)

        //asignar id
        cita.id = uuidv4();

        //crear cita 
        crearCita(cita)

        //reiniciar form
        setCita({
        mascota:'',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
        })
    }   
    return ( 
        <Fragment>
            <h2>Crear Cita</h2>
            {error?  <p className='alerta-error'>Todos los campos son obligatorios</p>   : null}
            <form
                onSubmit={submitCita}
            >
                <label> Nombre Mascota</label>
                <input
                    type="text"
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre Mascota'
                    onChange={handleChange}
                    value={mascota}
                />
                <label> Nombre Due??o</label>
                <input
                    type="text"
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre del due??o de la mascota'
                    onChange={handleChange}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name='fecha'
                    className='u-full-width'
                    onChange={handleChange}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name='hora'
                    className='u-full-width'
                    onChange={handleChange}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea
                className='u-full-width'
                name="sintomas"
                onChange={handleChange}
                value={sintomas}
                ></textarea>

                <button
                type='submit'
                className='u-full-width button-primary'                
                >Agregar cita</button>
            </form>

        </Fragment>
     );
}
 Formulario.propTypes ={
     crearCita: PropTypes.func.isRequired
 }
export default Formulario;