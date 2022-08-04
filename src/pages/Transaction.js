import React, {Component} from 'react';
import '../assets/css/App.css';

import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Datatable from '../components/DatatableTransaction';
import Message from '../components/Message';
import SearchDatatable from '../components/SearchDatatable';

const headers = ["Cliente", "Cuenta", "Fecha", "Tipo", "Monto", "Saldo"]
const pageName = "Movimientos"

class Transaction extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            type: null,
            data: []
        };
    }

    getTransactions = (name) => {
        fetch(name == null ? "http://localhost:8080/api/transactions" : "http://localhost:8080/api/transactions?name=" + name)
        .then(response => response.json().then(
            (data => {
                if (response.ok){
                    this.setState({
                        data: data
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

    componentDidMount(){
        this.getTransactions()
    };

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
                        <SearchDatatable search={this.getTransactions} path="" placeholder="cliente"/>
                        <Datatable headers = {headers} data = {data}/>
                    </div>
                </body>
            </div>
        )
    }
}

export default Transaction;