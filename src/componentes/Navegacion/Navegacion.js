import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navegacion.css';

class Navegacion extends Component {
    /**
     * Close a session with auth0
     */
    logout = () => {
        this.props.auth.logout();
    };

    login = () => {
        this.props.auth.login();
    };

    render() {
        const { isAuthenticated } = this.props.auth;
        let result;

        if (isAuthenticated()) {
            result = <a onClick={this.logout}>Cerrar Sesión</a>;
        } else {
            result = <a onClick={this.login}>Iniciar Sesión</a>;
        }

        return (
            <nav className="navegacion">
                <NavLink to={'/nosotros'} activeClassName="activo">
                    Nosotros
                </NavLink>
                <NavLink to={'/productos'} activeClassName="activo">
                    Productos
                </NavLink>
                <NavLink to={'/contacto'} activeClassName="activo">
                    Contacto
                </NavLink>
                {result}
            </nav>
        );
    }
}

export default Navegacion;
