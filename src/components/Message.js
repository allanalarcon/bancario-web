import React, {Component} from 'react';
import '../assets/css/Message.css';

class Message extends Component{
    render(){
        return(
            <div className={"bar " + this.props.type}>{this.props.message}</div>
        )
    }
}

export default Message;