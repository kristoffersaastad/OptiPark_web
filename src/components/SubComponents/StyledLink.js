import React from 'react'
import {Link} from 'react-router-dom'
export default class StyledLink extends React.Component{
    render(){
        return(
            <Link style={{textDecoration:'none',color:'#e3e6e4'}} to={this.props.to}>{this.props.content}</Link>
        )}

}