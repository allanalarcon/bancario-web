import React, {Component} from 'react';
import { Navigate } from 'react-router-dom';

import '../assets/css/App.css';
import '../assets/css/Form.css';

import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Message from '../components/Message';

const pageName = "Nueva transacción"

class TransactionNew extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            type: null,
            saved: false,
            account: null,
            search_data: [],
            form: {
                type: "",
                amount: "",
            }
        };
    }

    postTransaction=()=>{
        if (this.state.account == null){
            this.setState({
                message: "Elija cuenta",
                type: "Error",
            });
        }
        else{
            const request = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.form)
            };
    
            fetch("http://localhost:8080/api/accounts/" + this.state.account + "/transactions", request)
            .then(response => response.json().then(
                (data => {
                    if (response.ok){
                        this.setState({
                            saved: true
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

    getAccounts = () => {
        fetch("http://localhost:8080/api/accounts")
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

    handleChange = async e=>{
        e.persist();
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    componentDidMount(){
        this.getAccounts()
    };

    render(){
        const { type, message, saved } = this.state;
        if (saved) {
            return <Navigate to='/movimientos'/>;
        }
        return(
            <div className="App">
                <Header />
                <body>
                    <Sidebar active = "Movimientos"/>
                    <div className='Content'>
                        <h2>{pageName}</h2>
                        {message && (
                        <Message type = {type} message = {message}/>
                        )}
                        <div className="Form">
                            <label for="number">Cuenta: </label>
                            <select name="accountId" id="accountId" onChange={(e) => this.setState({account : e.target.value})}>
                                <option disabled selected value> -- seleccione -- </option>
                                {this.state.search_data.map((element)=>{
                                    return (
                                    <option value={element.id}>{element.number}</option>
                                    )
                                })}
                            </select>
                            <label for="type">Tipo: </label>
                            <select name="type" id="type" onChange={this.handleChange}>
                                <option disabled selected value> -- seleccione -- </option>
                                <option value="Debit">Debit</option>
                                <option value="Credit">Credit</option>
                            </select>
                            <label for="amount">Monto: </label>
                            <input type="number" id="amount" name="amount" onChange={this.handleChange}/>
                            <button onClick={() => this.postTransaction()}>Guardar</button>
                        </div>
                    </div>
                </body>
            </div>
        )
    }
}

export default TransactionNew;