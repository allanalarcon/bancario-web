import React, {Component} from 'react';
import '../assets/css/Sidebar.css';
import { sideBarData } from './SideBarData';

class Sidebar extends Component{
    render(){
        return(
            <div className="Sidebar">
                {sideBarData.map((element, index) => {
                    return (
                        <a class={element.title === this.props.active ? "active" : ""} href={element.path}>{element.title}</a>
                    )
                })}
            </div>
        );
    }
}

export default Sidebar;