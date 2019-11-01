import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

import {onLoginUser} from '../actions/index'
import './Login.css'

class Login extends Component {

    state = {
        username : "",
    }

    onLoginClick = () => {  
        // Mengambil data dari textbox
        let username = this.state.username
        let password = this.password.value

        console.log(username)
        console.log(password)

        // Memanggil Action Creator 'onLoginUser'
        this.props.onLoginUser(username, password)
    }

    render() {
        if(!this.props.user_name){
            return (
               <div className="container container-height">
                   <div className="row">
                        <h2 className="mx-auto" style={{color:'black', fontSize:'30px'}}>Welcome Back! </h2>
                   </div>

                   <div className="row">
                     <div className='col-lg-4 col-md-4 col-sm-8 col-8 mx-auto card'>
                       <div className='form'>
          
                        <div className='card-body'>
                            <div className="card-title d-flex justify-content-center" style={{fontSize: '150px'}}>
                              <img  src='https://www.fit2work.com.au/assets/img/avatars/LoginIconAppl.png'/>
                            </div>
                            
                            <form className='form-group'>
                                <div className="card-tittle mt-3">
                                <input type='text' className='form-control' placeholder='Enter Username' value={this.state.username} onChange={ _ => this.setState({ username : _.target.value}) } />
                                </div>
                    
    
                                <div className="card-title mt-3">
                                     <input ref={(input) => {this.password = input}} type='password' className='form-control' placeholder='Enter Password'/>
                                </div>
                            </form>
    
                            <button 
                                className="btn-block btn btn-outline-primary mt-2"
                                onClick={this.onLoginClick}
                                style={{height: '30px', fontSize: '15px'}}
                            >Login</button>
                            
                        </div>
                    </div>
                </div>
                </div>
             </div>
            )
        
        }else{
            return <Redirect to ='/' />
        }
    }
}

const mapStateToProps = state => {
    return {
        user_name : state.auth.username
    }
}



export default connect(mapStateToProps, {onLoginUser})(Login)