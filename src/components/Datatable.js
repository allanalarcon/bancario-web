import React, {Component} from 'react';
import '../assets/css/Datatable.css';

class Datatable extends Component{
    render(){
        return(
            <table className='Datatable'>
                <thead>
                    <tr>
                        {this.props.headers.map((header)=>{
                            return (
                                <th key={header}>{header}</th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map((element)=>{
                        let actions;
                        if (this.props.actions) {
                            actions = <React.Fragment>
                                        <button className="btn delete" onClick={() => this.props.delete(element.id)}>Eliminar</button>
                                        <a href={this.props.path + element.id + "/edit"}><button className="btn edit">Editar</button></a>
                                    </React.Fragment>
                        }
                        return (
                            <tr key={element.id}>
                                {Object.entries(element).map(([key,value])=>{
                                    if (key === "id") return false
                                    return <td>{value.toString()}</td>
                                })}
                                {actions}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

export default Datatable;