import React, {Component} from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import Navbar from './Navbar'
import Register from './Register'
import Login from './Login'
import Home from './Home'

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
   
    return (
     <div>
        <BrowserRouter>
                <Navbar/>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
        </BrowserRouter>
    </div>
              
    );
 }

} 

export default connect(null, {keepLogin})(App)