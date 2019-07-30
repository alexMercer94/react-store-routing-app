import React, { Component, Fragment } from 'react';
import Producto from '../Producto/Producto';
import Buscador from '../Buscador/Buscador';
import './Productos.css';
import axios from 'axios';

class Productos extends Component {
    state = {
        productos: [],
        terminoBusqueda: ''
    };

    componentWillMount() {
        this.queryAPI();
    }

    queryAPI = () => {
        const { getAccessToken } = this.props.auth;
        const headers = { Authorization: `Bearer ${getAccessToken()}` };
        const URL = 'http://localhost:5000/products';

        return axios.get(URL, { headers }).then(response => this.setState({ productos: response.data }));
    };

    /**
     * Login with Auth0
     */
    login = () => {
        this.props.auth.login();
    };

    busquedaProducto = busqueda => {
        if (busqueda.length > 3) {
            // Obtener copia del state
            let products = [...this.state.productos];

            // Filtar
            let result;
            result = products.filter(producto => producto.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1);

            // Enviar al state los prodctos filtrados y la busqueda
            this.setState({
                terminoBusqueda: busqueda,
                productos: result
            });
        } else {
            this.setState(
                {
                    terminoBusqueda: ''
                },
                () => {
                    this.queryAPI();
                }
            );
        }
    };

    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <div className="productos">
                {isAuthenticated() && (
                    <Fragment>
                        <h2>Nuestros Productos</h2>
                        <Buscador busqueda={this.busquedaProducto} />
                        <ul className="lista-productos">
                            {Object.keys(this.state.productos).map(product => (
                                <Producto informacion={this.state.productos[product]} key={product} />
                            ))}
                        </ul>
                    </Fragment>
                )}

                {!isAuthenticated() && (
                    <div className="conetenedor-boton">
                        <p>Para ver el contenido debes estar logueado:</p>
                        <a className="boton" onClick={this.login}>
                            Iniciar Sesión
                        </a>
                    </div>
                )}
            </div>
        );
    }
}

export default Productos;
