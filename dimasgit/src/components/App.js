import React, {Component} from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import Navbar from './Navbar'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Footer from './Footer'
import ManageProducts from './ManageProducts'
import ProductDetail from './ProductDetail'
import Cart from './Cart'
import Modal from './Modal'
import CheckOut from './CheckOut'
import './index.css'


import {connect} from 'react-redux'


const keepLogin = (objUser) => {
    
    // Action
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id: objUser.id,
            username: objUser.username,
            role: objUser.role
        }
    }
}

class App extends Component {

    state = {
        check: false
    }

    componentDidMount() {
        // check local storage
        let userStorage = JSON.parse(localStorage.getItem('userData'))
        
        if(userStorage){
            // kirim ke redux
            this.props.keepLogin(userStorage)
        }

        this.setState({check: true})
    }

render() {
   
    if (this.state.check){
        return (
         <div>
            <BrowserRouter>
                    
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/manageproducts" render={ () => <> <Navbar/> <ManageProducts/> </>} />
                    <Route path="/productdetail/:id" component={ProductDetail} />
                    <Route path='/cart' component={Cart}/>
                    <Route path='/modal' component={Modal}/>
                    <Route path='/checkout' component={CheckOut}/>
                    
                   <Route path='/' exact component={Footer}/>
            </BrowserRouter>
        </div>
                  
        );
    } else{
        return <h1>Loading</h1>
    }
 }

} 

export default connect(null, {keepLogin})(App)