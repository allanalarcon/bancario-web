import React, {Component} from 'react';
import { useParams } from 'react-router-dom';

import '../assets/css/App.css';
import '../assets/css/Form.css';

import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Message from '../components/Message';

const pageName = "Editar cuenta"

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class AccountEdit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            type: null,
            client: null,
            search_data: [],
            form: {
                number: "",
                type: "",
                amountInitial: "",
            },
            postForm: {
                active: ""
            }
        };
    }

    getAccount=()=>{
        fetch(`${process.env.REACT_APP_API}/api/accounts/` + this.props.params.id)
        .then(response => response.json().then(
            (data => {
                if (response.ok){
                    this.setState({
                        form:{
                            client: data.client.id,
                            number: data.number,
                            type: data.type,
                            amountInitial: data.amountInitial,
                        },
                        postForm:{
                            active: data.active,
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

    updateAccount=()=>{
        const request = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.postForm)
        };
        console.log(this.state.postForm)
        fetch(`${process.env.REACT_APP_API}/api/accounts/` + this.props.params.id, request)
        .then(response => response.json().then(
            (data => {
                if (response.ok){
                    this.setState({
                        message: "Cuenta actualizada",
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

    checkChange = async e=>{
        e.persist();
        this.setState({
            postForm:{
                active: e.target.checked
            }
        });
    }

    componentDidMount(){
        this.getAccount()
        this.getClients()
    };

    render(){
        const { type, message, form, postForm } = this.state;
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
                            <select disabled name="clientId" id="clientId" value={form.client} onChange={(e) => this.setState({client : e.target.value})}>
                                <option selected value> -- seleccione -- </option>
                                {this.state.search_data.map((element)=>{
                                    return (
                                    <option value={element.id}>{element.name}</option>
                                    )
                                })}
                            </select>
                            <label for="number">Número: </label>
                            <input disabled type="text" id="number" name="number" value={form.number} onChange={this.handleChange}/>
                            <label for="type">Tipo: </label>
                            <select disabled name="type" id="type" value={form.type} onChange={this.handleChange}>
                                <option disabled selected value> -- seleccione -- </option>
                                <option value="Ahorro">Ahorro</option>
                                <option value="Corriente">Corriente</option>
                            </select>
                            <label for="amountInitial">Monto inicial: </label>
                            <input disabled type="number" id="amountInitial" name="amountInitial" value={form.amountInitial} onChange={this.handleChange}/>
                            <label for="active">Activo</label>
                            <input type="checkbox" id="active" name="active" value="true" onChange={this.checkChange} checked={postForm.active}></input>
                            <button onClick={() => this.updateAccount()}>Guardar</button>
                        </div>
                    </div>
                </body>
            </div>
        )
    }
}

export default withParams(AccountEdit);