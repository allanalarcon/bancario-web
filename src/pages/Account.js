import React, {Component} from 'react';
import '../assets/css/App.css';

import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Datatable from '../components/DatatableAccount';
import Message from '../components/Message';
import SearchDatatable from '../components/SearchDatatable';

const headers = ["Cliente", "Número", "Tipo", "Monto inicial", "Activo"]
const pageName = "Cuentas"

class Account extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            type: null,
            data: []
        };
    }

    getAccounts = (number) => {
        fetch(number == null ? `${process.env.REACT_APP_API}/api/accounts` : `${process.env.REACT_APP_API}/api/accounts?number=` + number)
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

    deleteAccount = (id) =>{
        const request = {
            method: 'DELETE',
        };

        fetch(`${process.env.REACT_APP_API}/api/accounts/` + id, request)
        .then(
            (async data => {
                if (data.ok){
                    this.setState({
                        message: "Cuenta eliminada",
                        type: "Success"
                    })
                    this.getAccounts();
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
        this.getAccounts()
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
                        <SearchDatatable search={this.getAccounts} path="/cuentas/add"  placeholder="número"/>
                        <Datatable headers = {headers} data = {data} delete = {this.deleteAccount} path="/cuentas/" actions={true}/>
                    </div>
                </body>
            </div>
        )
    }
}

export default Account;