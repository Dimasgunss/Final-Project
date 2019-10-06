import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

import {onLoginUser}  from '../actions/index'
import './Login.css'

class Login extends Component {

    onLoginClick = () => {
        // Mengambil data dari textbox
        let username = this.username.value
        let password = this.password.value

        // Memanggil Action Creator 'onLoginUser'
        this.props.onLoginUser(username, password)
    }

    render() {
        if(!this.props.username){
            return (
               <div className="container">
                   <div className="row">
                        <h2 className="mx-auto" style={{fontFamily: 'Luckiest Guy, cursive' ,color:'black', fontSize:'30px'}}>Welcome Back! </h2>
                   </div>

                   <div className="row">
                   <div className='col-lg-4 col-md-4 col-sm-8 col-8 mx-auto card'>
                 <div className='form'>
          
                        <div className='card-body'>
                            <div className="card-title d-flex justify-content-center" style={{fontSize: '150px'}}>
                            🤣
                            </div>
                            
                            <form className='form-group'>
                                <div className="card-tittle mt-3">
                                <input ref={(input) => {this.username = input}} type='text' className='form-control' placeholder='Enter Username'/>
                                </div>
                    
    
                                <div className="card-title mt-3">
                                     <input ref={(input) => {this.password = input}} type='password' className='form-control' placeholder='Enter Password'/>
                                </div>
                            </form>
    
                            <button 
                                className="btn-block btn btn-outline-success mt-2"
                                onClick={this.onLoginClick}
                                style={{height: '30px'}}
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
        user_name :state.auth.username
    }
}



export default connect(mapStateToProps, {onLoginUser})(Login)