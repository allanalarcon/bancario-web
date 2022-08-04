import React, {Component} from 'react';
import '../assets/css/Datatable.css';

class DatatableAccount extends Component{
    render(){
        return(
            <table className='Datatable'>
                <thead>
                    <tr>
                        {this.props.headers.map((header)=>{
                            return (
                                <th>{header}</th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map((account)=>{
                        return (
                            <tr key={account.id}>
                                {Object.entries(account).map(([key,value])=>{
                                    if (key === "id") return false
                                    if (key === "client") return <td>{value.name.toString()}</td>
                                    return <td>{value.toString()}</td>
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

export default DatatableAccount;