import React, {Component} from 'react';

import logo_banco from '../assets/images/logo.png';
import '../assets/css/App.css';

class Header extends Component{
    render(){
        return(
            <header className="App-header">
                <img src={logo_banco} className="App-logo" alt="logo" />
            </header>
        )
    }
}

export default Header;