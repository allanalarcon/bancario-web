import React, {Component} from 'react';
import { useParams } from 'react-router-dom';

import '../assets/css/App.css';
import '../assets/css/Form.css';

import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Message from '../components/Message';

const pageName = "Editar cliente"

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class ClientEdit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            type: null,
            form: {
                name: "",
                dni: "",
                gender: "",
                age: "",
                address: "",
                phone: "",
                password: "",
            }
        };
    }

    getClient=()=>{
        fetch("http://localhost:8080/api/clients/" + this.props.params.id)
        .then(response => response.json().then(
            (data => {
                if (response.ok){
                    this.setState({
                        form:{
                            name: data.name,
                            dni: data.dni,
                            gender: data.gender,
                            age: data.age,
                            address: data.address,
                            phone: data.phone,
                            password: data.password
                        }
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

    updateClient=()=>{
        const request = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.form)
        };

        fetch("http://localhost:8080/api/clients/" + this.props.params.id, request)
        .then(response => response.json().then(
            (data => {
                if (response.ok){
                    this.setState({
                        message: "Cliente actualizado",
                        type: "Success"
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
        this.getClient()
    }

    render(){
        const { type, message, form } = this.state;
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
                            <input type="text" id="name" name="name" value={form.name} onChange={this.handleChange}/>
                            <label for="dni">Identificación: </label>
                            <input type="text" id="dni" disabled value={form.dni}/>
                            <label for="gender">Género: </label>
                            <select name="gender" id="gender" value={form.gender} onChange={this.handleChange}>
                                <option disabled selected value> -- seleccione -- </option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>
                            <label for="age">Edad: </label>
                            <input type="number" id="age" name="age" value={form.age} onChange={this.handleChange}/>
                            <label for="address">Dirección: </label>
                            <input type="text" id="address" name="address" value={form.address} onChange={this.handleChange}/>
                            <label for="phone">Teléfono: </label>
                            <input type="text" id="phone" name="phone" value={form.phone} onChange={this.handleChange}/>
                            <button onClick={() => this.updateClient()}>Guardar</button>
                        </div>
                    </div>
                </body>
            </div>
        )
    }
}

export default withParams(ClientEdit);