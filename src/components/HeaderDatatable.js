import React, {Component} from 'react';
import '../assets/css/HeaderDatatable.css';

class HeaderDatatable extends Component{
    render(){
        return (
            <div className="Header-Datatable">
                <div className="col-6"><input type="text" id="search" placeholder={"Buscar por " + this.props.placeholder + "..."} onChange={e => this.props.search(e.target.value)}/></div>
                <div className="col-6 right"><a className="add" href={this.props.path}>Nuevo</a></div>
            </div>
        )
    }
}

export default HeaderDatatable