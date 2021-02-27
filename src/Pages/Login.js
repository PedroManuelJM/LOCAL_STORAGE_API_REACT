import React, { Component } from 'react';
import $ from 'jquery/dist/jquery'; // importante
import { usuarioLocal } from '../utils';
import { ApiWebUrl } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
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
          this.props.history.push('/home')
    
        }
      }

    mostrarModal() {
        $("#modal-login").modal();
    }

    dibujarModal() {
        return (
            <div className="modal fade" id="modal-login" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-info">
                            <div className="container text-center">
                                <h5 id="titulo" className="modal-title" id="exampleModalLabel">Iniciar Sesión</h5>
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="container text-center">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text" id="btnGroupAddon"> <FontAwesomeIcon className="fa-icon" icon={faUser} /> </div>
                                        </div>
                                        <input type="text" id="usuario" className="form-control" placeholder="Ingrese su usuario: reactjs"
                                            value={this.state.username}
                                            onChange={(e) => this.setState({ username: e.target.value })}
                                        />
                                    </div>
                                    <br></br>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text" id="btnGroupAddon"><FontAwesomeIcon className="fa-icon" icon={faLock} /></div>
                                        </div>
                                        <input type="password" id="clave" className="form-control" placeholder="Ingrese su contraseña: react123456"
                                            value={this.state.clave}
                                            onChange={(e) => this.setState({ clave: e.target.value })}
                                        />
                                    </div>
                                    <br></br>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.iniciarsesion()}>Aceptar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }


    iniciarsesion() {
        if (this.state.username === "") return alert("Ingrese el usuario")
        if (this.state.clave === "") return alert("Ingrese la contraseña")

        const rutaServicio = ApiWebUrl + "db_reserva/iniciarsesion.php";
        var formData = new FormData();
        formData.append("username", this.state.username)
        formData.append("clave", this.state.clave)
        //Asi se agregan todos los parámetros que el servicio requiera (nombre del parámetro , valor que se envía)  
        fetch(rutaServicio, {
            method: 'POST',
            body: formData
        })
            .then(
                res => res.json()
            )
            .then(
                (result) => {
                    console.log(result);
                    this.evaluarInicioSesion(result)
                }
            )
    }
    evaluarInicioSesion(result) {
        if (result === -1) {
            return swal({
                title: `El usuario no existe `,
                text: 'Por favor registrarse a la plataforma.',
                timer: 2000,
                icon: "error",
                timerProgressBar: true,
            })
        } else if (result === -2) {

            return swal({
                title: `Contraseña incorrecta`,
                text: 'Ingrese su contraseña correcta.',
                timer: 2000,
                icon: "error",
                timerProgressBar: true,
            })
        }
        localStorage.setItem("DatosUsuario", JSON.stringify(result[0]))
        $("#modal").modal("toggle");/* ocultar modal */
        /* Limpiando el buffer */
        document.getElementById('usuario').value = '';
        document.getElementById('clave').value = '';
        swal({
            title: `Bienvenido: ${result[0].nombres}`,
            text: 'Ahora puede acceder a su información',
            timer: 2000,
            icon: "success",
            timerProgressBar: true,
        }).then((result) => {
            window.location.reload(false)
        })
    }
    render() {
        let contenidoModal = this.dibujarModal();
        return (
            <>
                <div id="btn-login" className="container-fluid text-center">
                    <button className="btn btn-success" onClick={() => this.mostrarModal()}>Login</button>
                </div>
                {contenidoModal}
            </>
        );
    }
}