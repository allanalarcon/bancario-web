import React, {Component} from 'react';
import '../assets/css/App.css';

import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Datatable from '../components/Datatable';
import Message from '../components/Message';
import SearchReport from '../components/SearchReport';

const headers = ["Fecha", "Cliente", "Cuenta", "Tipo cuenta", "Monto inicial", "Tipo", "Movimiento", "Saldo", "Activo cuenta"]
const pageName = "Reporte"

class Report extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            type: null,
            data: [],
            search_data: []
        };
    }

    getClients = (name) => {
        fetch(name == null ? "http://localhost:8080/api/clients" : "http://localhost:8080/api/clients?name=" + name)
        .then(response => response.json().then(
            (data => {
                if (response.ok){
                    this.setState({
                        search_data: data,
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

    getReport = (client, dateStart, dateEnd) => {
        this.setState({
            data: [],
        });

        if (client == null || dateStart == null || dateEnd == null || dateStart === "" || dateEnd === ""){
            this.setState({
                message: "Elija cliente y fechas",
                type: "Error",
            });
        }
        else{
            fetch("http://localhost:8080/api/clients/"+ client +"/report?dateTransactionStart=" + dateStart + "&dateTransactionEnd=" + dateEnd)
            .then(response => response.json().then(
                (data => {
                    if (response.ok){
                        this.setState({
                            data: data,
                            message: null
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
    }

    componentDidMount(){
        this.getClients()
    };

    render(){
        const { type, message, data, search_data } = this.state;
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
                        <SearchReport data={search_data} placeholder="nombre" search={this.getReport}/>
                        <Datatable headers = {headers} data = {data}/>
                    </div>
                </body>
            </div>
        )
    }
}

export default Report;