import React, {Component} from 'react';
import { Navigate } from 'react-router-dom';

import '../assets/css/App.css';
import '../assets/css/Form.css';

import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Message from '../components/Message';

const pageName = "Nuevo cliente"

class ClientNew extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            type: null,
            saved: false,
            form: {
                name: "",
                dni: "",
                gender: "",
                age: "",
                address: "",
                phone: "",
                password: "",
                active: "",
            }
        };
    }

    postClient=()=>{
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.form)
        };

        fetch(`${process.env.REACT_APP_API}/api/clients`, request)
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

    render(){
        const { type, message, saved } = this.state;
        if (saved) {
            return <Navigate to='/clientes'/>;
        }
        return(
            <div className="App">
                <Header />
                <body>
                    <Sidebar active = "Clientes"/>
                    <div className='Content'>
                        <h2>{pageName}</h2>
                        {message && (
                        <Message type = {type} message = {message}/>
                        )}
                        <div className="Form">
                            <label for="name">Nombre: </label>
                            <input type="text" id="name" name="name" onChange={this.handleChange}/>
                            <label for="dni">Identificaci??n: </label>
                            <input type="text" id="dni" name="dni" onChange={this.handleChange}/>
                            <label for="gender">G??nero: </label>
                            <select name="gender" id="gender" onChange={this.handleChange}>
                                <option disabled selected value> -- seleccione -- </option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>
                            <label for="age">Edad: </label>
                            <input type="number" id="age" name="age" onChange={this.handleChange}/>
                            <label for="address">Direcci??n: </label>
                            <input type="text" id="address" name="address" onChange={this.handleChange}/>
                            <label for="phone">Tel??fono: </label>
                            <input type="text" id="phone" name="phone" onChange={this.handleChange}/>
                            <label for="password">Contrase??a: </label>
                            <input type="password" id="password" name="password" onChange={this.handleChange}/>
                            <label for="active">Activo</label>
                            <input type="checkbox" id="active" name="active" value="true" onChange={this.checkChange}></input>
                            <button onClick={() => this.postClient()}>Guardar</button>
                        </div>
                    </div>
                </body>
            </div>
        )
    }
}

export default ClientNew;