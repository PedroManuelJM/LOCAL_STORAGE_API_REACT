import React, { Component } from 'react';
import {  usuarioLocal } from '../utils';
import avatar from '../assets/img/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faEnvelope,faPhoneAlt,faMapMarker,faDoorClosed } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
            clave: '',
            usuario: null,
        };
    }
    componentDidMount() {
        const usuarioL = usuarioLocal();
        if (usuarioL !== null) {
          this.setState({
            usuario: usuarioL
          })
        }else{
           swal({
                title: `Página no Permitida`,
                text: ' ¡ Debes iniciar sesión. !',
                timer: 2000,
                icon: "info",
                timerProgressBar: true,
          })
          this.props.history.push('/') // direcciona a la página principal
        }
    }
    cerrarSesion() {
        localStorage.removeItem("DatosUsuario")
        this.setState({
          usuario: null
        })
        swal({
            title: `Cerrando Sesión`,
            text: ' Usted '+this.state.usuario.nombres+' ha cerrado sesión.',
            timer: 2000,
            icon: "success",
            timerProgressBar: true,
        })
        this.props.history.push('/') 
    }
    
    render() {
      //  let contenidoModal = this.dibujarModal();
        return (
            <section id="info">
              <div className="container">
                    <div className="row">
                        <div className="col-sm-2 col-md-2">
                        </div>

                        <div className="col-sm-8 col-md-8">
                            <div className="container">
                              <FontAwesomeIcon className="fa-icon" icon={faDoorClosed} onClick={(e) => this.cerrarSesion()} /> Cerrar Sesión
                            </div>
                           
                            <div className="card mb-3" >
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img id="avatar" src={avatar} className="img-fluid" alt="..." />
                                    </div>
                                    {this.state.usuario !== null ?
                                    <div className="col-md-8">

                                        <div className="card-body">
                                            <h5 className="card-title">Datos Personales <FontAwesomeIcon className="fa-icon" icon={faUserCircle} />  </h5>
                                            <p className="card-text">Nombres y Apellidos Completos   <br/>
                                              {this.state.usuario.nombres} , {this.state.usuario.apellidos}
                                            </p>
                                            <p className="card-text">
                                                <small className="text-muted">Correo <FontAwesomeIcon className="fa-icon" icon={faEnvelope} /> : {this.state.usuario.username} </small> <br/>
                                                <small className="text-muted">Teléfono <FontAwesomeIcon className="fa-icon" icon={faPhoneAlt} /> :   {this.state.usuario.telefono} </small> <br/>
                                                <small className="text-muted">Direcciòn <FontAwesomeIcon className="fa-icon" icon={faMapMarker} /> : {this.state.usuario.direccion} </small>

                                            </p>
                                        </div>
                                    </div>
                                      :
                                      <div className="col-md-8">
                                      </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-2 col-md-2">
                        </div>
                    </div>
                </div>
           </section>
        );
    }
}