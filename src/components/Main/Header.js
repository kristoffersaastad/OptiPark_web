import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {auth} from '../../firebase';
import { changeLogin } from '../../actions/login'
import { fetchBookings, fetchCars, fetchInfo } from '../../actions/fetchers'
import { getGeo } from '../../actions/geo';
import SignUp from '../LoginComponents/SignUp'
import SignIn from '../LoginComponents/SignIn'
import StyledLink from '../SubComponents/StyledLink'
import UserName from '../LoginComponents/UserName';
import { Fade } from 'react-reveal'

class Header extends Component{

    constructor(props){
        super(props);

        this.state = {
            
        }
    }
    
    componentWillMount(){      
        this.props.getGeo(this.props.parkinglot)
        window.localStorage.removeItem("LOGIN")
    }

    componentDidMount(){
        
        auth.onAuthStateChanged((user)=>{            
            if (user) {                
                this.props.changeLogin(true);
                window.localStorage.setItem("LOGIN","yes")
                this.props.fetchInfo();
                this.props.fetchCars();
                this.props.fetchBookings();
                
            }else{
                this.props.changeLogin(false);
                window.localStorage.removeItem("LOGIN")
            }
        });
    }

    render(){
        return(
            <Fade>
            <nav className={"bp3-navbar bp3-dark header"} style={this.props.headerBkg?{color: '#f5f8fa',fontWeight:600,backgroundColor:'rgba(0,0,0,0)', boxShadow:'none'}:{color: '#f5f8fa',backgroundColor:'',boxShadow:''}}>
                <div style={{margin: '0 auto', width: '100%'}}>
                    <div className="bp3-navbar-group bp3-align-left">
                        <StyledLink to="/" content={<div className="bp3-navbar-heading">OptiPark</div>}></StyledLink>
                    </div>
                    <div className="bp3-navbar-group bp3-align-right">
                        <StyledLink to="/" content={<button className="bp3-button bp3-minimal bp3-icon-home">Home</button>}/>
                        <StyledLink to="/contact" content={<button className="bp3-button bp3-minimal bp3-icon-annotation">Contact</button>}/>

                        <span className="bp3-navbar-divider"></span>
                        {this.props.login&&this.props.userInfo?
                        <React.Fragment>
                            <UserName/>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <SignIn/>
                            <SignUp/>
                        </React.Fragment>
                        }
                    </div>
                </div>
            </nav>
            </Fade>
    )}
}

const mapStateToProps = (state) => {    
    const { login, userInfo } = state.data;
    const { headerBkg, parkinglot } = state.global
    
    return {
        login,
        userInfo,
        headerBkg,
        parkinglot
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchInfo, fetchCars, fetchBookings, changeLogin, getGeo }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Header);
