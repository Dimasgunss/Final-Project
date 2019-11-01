import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class Cart extends Component {

    state = {
        carts: [],
        checkout: null
    }

    componentDidMount() {
        this.getData()
    }

     onCheckoutClick = () => {
        this.setState(state => {
            return {
                checkout: state.carts
            }
        })
    }

    getData = () => {
           axios.get(
            'http://localhost:2001/auth/',
            
            {
                params: {
                    userId : this.props.user_id
                }
            }
        ).then(res => {
            this.setState({carts: res.data})
        })
    }

    renderList = () => {
        return (
            <tr>
                <td>{this.state.carts.id}</td>
                <td>{this.state.carts.productName}</td>
                <td>{this.state.carts.productDesc}</td>
                <td>{this.state.carts.productPrice}</td>
                <td>{this.state.carts.productQty}</td>
                <td>
                    <img className='list' src={this.state.carts.productpict }/>
                </td>
                <td></td>
            </tr>
        )
    }

    render() {
        return (
            <div>
                <h1 className='display-4 text-center'>List Product</h1>
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>DESC</th>
                            <th>PRICE</th>
                            <th>QTY</th>
                            <th>PICTURE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>

                    <div className='text-center'>
                        <button onClick={this.onCheckoutClick} className='btn btn-primary'>checkout</button>
                    </div>

                    <checkout carts={this.state.checkout} />

            </div>
        )
    }
} 

const mstp = state => {
     return {
         user_id : state.auth.id
     }
}


export default connect(mstp)(Cart)