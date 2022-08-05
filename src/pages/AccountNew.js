import React, {Component} from 'react';
import { Navigate } from 'react-router-dom';

import '../assets/css/App.css';
import '../assets/css/Form.css';

import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Message from '../components/Message';

const pageName = "Nueva cuenta"

class AccountNew extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            type: null,
            saved: false,
            client: null,
            search_data: [],
            form: {
                number: "",
                type: "",
                amountInitial: "",
                active: "",
            }
        };
    }

    postAccount=()=>{
        if (this.state.client == null){
            this.setState({
                message: "Elija cliente",
                type: "Error",
            });
        }
        else{
            const request = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.form)
            };
    
            fetch(`${process.env.REACT_APP_API}/api/clients/` + this.state.client + "/accounts", request)
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

    getClients = () => {
        fetch(`${process.env.REACT_APP_API}/api/clients`)
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

    checkChange = async e=>{
        e.persist();
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value,
                active: e.target.checked
            }
        });
    }

    componentDidMount(){
        this.getClients()
    };

    render(){
        const { type, message, saved } = this.state;
        if (saved) {
            return <Navigate to='/cuentas'/>;
        }
        return(
            <div className="App">
                <Header />
                <body>
                    <Sidebar active = "Cuentas"/>
                    <div className='Content'>
                        <h2>{pageName}</h2>
                        {message && (
                        <Message type = {type} message = {message}/>
                        )}
                        <div className="Form">
                            <label for="number">Cliente: </label>
                            <select name="clientId" id="clientId" onChange={(e) => this.setState({client : e.target.value})}>
                                <option disabled selected value> -- seleccione -- </option>
                                {this.state.search_data.map((element)=>{
                                    return (
                                    <option value={element.id}>{element.name}</option>
                                    )
                                })}
                            </select>
                            <label for="number">Número: </label>
                            <input type="text" id="number" name="number" onChange={this.handleChange}/>
                            <label for="type">Tipo: </label>
                            <select name="type" id="type" onChange={this.handleChange}>
                                <option disabled selected value> -- seleccione -- </option>
                                <option value="Ahorro">Ahorro</option>
                                <option value="Corriente">Corriente</option>
                            </select>
                            <label for="amountInitial">Monto inicial: </label>
                            <input type="number" id="amountInitial" name="amountInitial" onChange={this.handleChange}/>
                            <label for="active">Activo</label>
                            <input type="checkbox" id="active" name="active" value="true" onChange={this.checkChange}></input>
                            <button onClick={() => this.postAccount()}>Guardar</button>
                        </div>
                    </div>
                </body>
            </div>
        )
    }
}

export default AccountNew;