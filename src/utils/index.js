export const ApiWebUrl="https://unmaidenly-road.000webhostapp.com/";

// Usaremos localStorage para almacenar
// los datos de manera localmente cuando haya
// recibido los datos de la API

export const usuarioLocal=()=>{
    if(localStorage.getItem('DatosUsuario')!==null){
        return JSON.parse(localStorage.getItem('DatosUsuario'))
    }else{
        return null
    }
}