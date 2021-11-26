import React , {Fragment,useState, useEffect} from 'react'
import './assets/index.css'
import Formulario from './components/Formulario'
import Cita from './components/Cita'

function App() {
//citas en el local storagge
let citasIniciales = JSON.parse(localStorage.getItem('citas'))
if(!citasIniciales){
  citasIniciales=[]
}

//array de citas
  const [citas,setCitas] = useState(citasIniciales);

  // useEffect cuando el state cambia

  useEffect(()=>{
    let citasIniciales = JSON.parse(localStorage.getItem('citas'))
    if(citasIniciales){localStorage.setItem('citas',JSON.stringify(citas))}
    else{localStorage.setItem('citas',JSON.stringify([]))}
  },[citas])

//funcion elimninar cita por id
const eliminarCita = id =>{
 const nuevasCitas = citas.filter(cita=>cita.id !== id );
 setCitas(nuevasCitas)
 
}

  //funcion que tome las citas actuales y agrege las nuevas
  const crearCita = cita=>{
    setCitas([
      ...citas, //copiamos lo que haya en el array asi no se sobrescribe
      cita//la nueva creada
    ])
  }
  //mensaje condicional
  const titulo = citas.length === 0? 'No hay citas': 'Adminsitra tus citas'

  return (
    <Fragment>
     <h1>Administrador de pacientes</h1>

     <div className="container">
      <div className="row">
        <div className="one-half column">
        <Formulario
        crearCita={crearCita}
        />
        </div>
        <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita=>(
              <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}/> 
            ))}
        </div>
      </div>
     </div>
     </Fragment>
  );
}

export default App;
