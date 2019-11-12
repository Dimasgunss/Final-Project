import React, {Component} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"
import './Register.css'

class Register extends Component {

    state = {
        loading: false,
        error: '',
        success: ''
    }
    
    onRegisterClick = () => {
        this.setState({loading: true})

        // Ambil semua data dari text input
        let data_username = this.username.value
        let data_email = this.email.value
        let data_password = this.password.value

        // Check apa username sudah terpakai
        axios.get(
            'http://localhost:2001/auth/getdata',
            {
                params: {
                    username: data_username
                }
            }
        ).then( (res) => {
            if(data_username ==  ""  || data_password ==  "" || data_email == "") {
                this.setState({loading:false, error: "Data tidak boleh kosong"})
            }
            // Jika data di temukan berdasarkan username
            else if(res.data.length > 0){

                // spinner akan jadi button, akan muncul pesan 'error
                this.setState({loading: false, error:'Username sudah digunakan'})

                // Menghapus pesan error setelah 3 detik
                setTimeout(
                    () => { this.setState({error: ''}) },
                    3000
                )


            } else {
                // Check apakah email sudah digunakan
                axios.get(
                    'http://localhost:2001/auth/getdata',
                    {
                        params: {
                            email: data_email
                        }
                    }
                ).then( (res) => {

                    // Jika data ditemukan berdasarkan email
                    if(res.data.length > 0){
                        
                        // spinner jadi button, muncul pesan 'error'
                        this.setState({loading: false, error:'Email sudah digunakan'})

                    } else {
                        // POST DATA BARU
                        axios.post(
                            'http://localhost:2001/auth/register',
                            {
                                username: data_username,
                                email: data_email,
                                password: data_password
                            }
                        ).then(() => {
                            
                            // spinner jadi button, muncul pesan 'success'
                            this.setState({loading: false, success:'Register berhasil'})
                            
                        })

                    }

                } )

            }

        } )

    }

    loadingButton = () => {
        if(this.state.loading){
            return (
                <div className='spinner-grow' role='status'>
                    <span className='sr-only'></span>
                </div>
            )

        }

        return (
            <button 
                className='btn-block btn btn-outline-dark mt-2' style={{fontSize: '15px'}}
                onClick={this.onRegisterClick}
            >Register</button>
        )

    }

    notification = () => {
        if(this.state.error){
            // notif error, danger
            return (
                <div className='alert alert-danger mt-4'>
                    {this.state.error}
                </div>
            )

        } else if(this.state.success){
            // notif success, success
            return (
                <div className='alert alert-success mt-4'>
                    {this.state.success}
                </div>
            )

        } else {
            return null
        }
    }

    render() {
        return (
            <div className="container">
               <div className="row">
                 <h2 className="mx-auto my-5" style={{color:'black', fontSize:'30px'}}><b>Daftar akun baru sekarang!</b></h2>
               </div>

                <div className="row my-4">
                   <div className='col-lg-4 col-md-4 col-sm-8 col-8 mx-auto p-5 card'>
                      <div className='form'>
                        <form className='form-group' >
                            <div className="card-title">
                                <h4>Username</h4>
                            <input ref={(input) => {this.username = input}} type='text' className='form-control' placeholder='Username'/>
                            </div>
                            <div className="card-title">
                                <h4>Email</h4>
                            </div>
                            <input ref={(input) => {this.email = input}} type='email' className='form-control' placeholder='Email'/>

                            <div className="card-title ">
                                <h4>Password</h4>
                            </div>
                            <input ref={(input) => {this.password = input}} type='password' className='form-control' placeholder='Password'/>

                        </form>
                        
                        <div className='d-flex justify-content-center'>
                            {this.loadingButton()}
                        </div>

                        {this.notification()}
                        
                       <div className='mt-2'>
                       Sudah punya akun? 
                       <Link className='ml-1' style={{color: 'red'}} to="/login">
                       Login aja
                       </Link> 
                        </div> 


                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Register