import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Navbar from './Navbar'

class ProductDetail extends Component {

    state = {
        id: 0,
        product : [],
        qty : 0,
        isDone: false
    }

    componentDidMount() {
        console.log(this.props.location.pathname.split('/')[2])
      this.getData()
    }

    getData = () => {
        axios.get(`http://localhost:2001/auth/getproductdetail`,
        {
            params : {
                id: this.props.location.pathname.split('/')[2]
            }}

        ).then(res => {
            console.log(res.data)
            this.setState({
                product: res.data[0]
            })
        }).catch(err => {
            console.log(err)
        })
    }

    addToCarts = () => {
        console.log(this.state.product.id);
        console.log(this.props.userId);
        console.log(this.state.qty);
        
        axios.post(
            `http://localhost:2001/auth/postaddtocarts`,

            {
                productId: this.state.product.id,
                userId: this.props.userId,
                qty: this.state.qty

            }
            ).then(res => {
                this.setState({
                    id: res.data,
                    isDone: true 
                })
                // this.getData()
            })
        }

    render() {  
        console.log(this.state.product);
        console.log(this.props.userId);
        
        if (!this.state.isDone) {
            if(this.state.product){
            return (
                  <div className='card col-5 my-5 mx-auto'>
                    <div className='card-header mt-2'>
                        <h2>{this.state.product.name}</h2>
                    </div>
                    <div className='card-body'>
                        <img clasName='card-img-top' style={{width: '400px', marginLeft: '50px'}} src={this.state.product.picture}/>
                        <h3>Name : {this.state.product.name}</h3>
                        <p>Description : {this.state.product.description}</p>
                        <p>Harga : Rp. {this.state.product.price}</p>
                    </div>
                    <form><input className ='form-control' type="number" onChange={e => this.setState({qty: e.target.value})}/></form>
                   <button className='btn btn-block-secondary mt-2'
                        onClick={this.addToCarts}
                    >Add To Cart</button>
                  </div>
               )
            }else{
                return <div><h1 className='text-center'>Loading</h1></div>
            }
        } else {
            return <Redirect to="/cart"/>
        }
    }
}

const mstp = state => {
    return {
        userId: state.auth.id
    }
}


export default connect(mstp) (ProductDetail)