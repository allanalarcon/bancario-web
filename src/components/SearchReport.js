import React, {Component} from 'react';
import '../assets/css/SearchReport.css';

class SearchReport extends Component{
    constructor(props) {
        super(props);
        this.state = {
            client: null,
            dateStart: null,
            dateEnd: null,
        };
    }

    render(){
        const {client, dateStart, dateEnd} = this.state;
        return(
            <div className="SearchReport">
                <div className="col-3">
                <select name="clientId" id="clientId" onChange={(e) => this.setState({client : e.target.value})}>
                    <option disabled selected value> -- seleccione -- </option>
                    {this.props.data.map((element)=>{
                        return (
                        <option value={element.id}>{element.name}</option>
                        )
                    })}
                </select>
                </div>
                <div className="col-3"><input type="date" id="dateTransactionStart" name="dateTransactionStart" onChange={(e) => this.setState({dateStart : e.target.value})}></input></div>
                <div className="col-3"><input type="date" id="dateTransactionEnd" name="dateTransactionEnd" onChange={(e) => this.setState({dateEnd : e.target.value})}></input></div>
                <div className="col-3 right">
                    <div className="col-12">
                        <button onClick={() => this.props.search(client, dateStart, dateEnd)}>Buscar</button>
                        <a target="_blank" rel="noopener noreferrer" href={`${process.env.REACT_APP_API}/api/clients/` + client + "/report/pdf?dateTransactionStart=" + dateStart + "&dateTransactionEnd=" + dateEnd}><button className="btn edit">PDF</button></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchReport