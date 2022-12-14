import React, {Component} from 'react';
import '../assets/css/App.css';

import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Datatable from '../components/Datatable';
import Message from '../components/Message';
import SearchDatatable from '../components/SearchDatatable';

const headers = ["Identificación", "Nombre", "Género", "Edad", "Dirección", "Teléfono", "Activo", "Acciones"]
const pageName = "Clientes"

class Client extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            type: null,
            data: []
        };
    }

    getClients = (name) => {
        fetch(name == null ? `${process.env.REACT_APP_API}/api/clients` : `${process.env.REACT_APP_API}/api/clients?name=` + name)
        .then(response => response.json().then(
            (data => {
                if (response.ok){
                    this.setState({
                        data: data,
                    });
                }
                else {
                    this.setState({
                        message: data.errors,
                        type: "Error"
                    });
                }
            }
        )))
    }

    deleteClient = (id) =>{
        const request = {
            method: 'DELETE',
        };

        fetch(`${process.env.REACT_APP_API}/api/clients/` + id, request)
        .then(
            (async data => {
                if (data.ok){
                    this.setState({
                        message: "Cliente eliminado",
                        type: "Success"
                    })
                    this.getClients();
                }
                else {
                    let response = await data.json()
                    this.setState({
                        message: response.errors,
                        type: "Error"
                    });
                }
            }
        ))
    }

    componentDidMount(){
        this.getClients()
    }

    render(){
        const { type, message, data } = this.state;
        return (
            <div className="App">
                <Header />
                <body>
                    <Sidebar active = {pageName}/>
                    <div className='Content'>
                        <h2>{pageName}</h2>
                        {message && (
                        <Message type = {type} message = {message}/>
                        )}
                        <SearchDatatable search={this.getClients} path="/clientes/add" placeholder="nombre"/>
                        <Datatable headers = {headers} data = {data} delete = {this.deleteClient} path="/clientes/" actions={true}/>
                    </div>
                </body>
            </div>
        )
    }
}

export default Client;