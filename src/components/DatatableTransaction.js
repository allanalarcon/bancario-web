import React, {Component} from 'react';
import '../assets/css/Datatable.css';

class DatatableTransaction extends Component{
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
                    {this.props.data.map((transaction)=>{
                        return (
                            <tr key={transaction.id}>
                                {Object.entries(transaction).map(([key,value])=>{
                                    if (key === "id") return false
                                    if (key === "account") return <React.Fragment><td>{value.client.name.toString()}</td><td>{value.number.toString()}</td></React.Fragment>
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

export default DatatableTransaction;