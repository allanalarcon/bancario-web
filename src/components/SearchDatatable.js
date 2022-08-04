import React, {Component} from 'react';
import '../assets/css/SearchDatatable.css';

class HeaderDatatable extends Component{
    render(){
        let button
        if (this.props.path){
            button = <div className="col-6 right"><a className="add" href={this.props.path}>Nuevo</a></div>
        }
        return (
            <div className="Header-Datatable">
                <div className="col-6"><input type="text" id="search" placeholder={"Buscar por " + this.props.placeholder + "..."} onChange={e => this.props.search(e.target.value)}/></div>
                {button}
            </div>
        )
    }
}

export default HeaderDatatable