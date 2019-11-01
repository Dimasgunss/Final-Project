import React, { Component } from 'react'
import axios from 'axios'

class ProductDetail extends Component {

    state = {
        product : null
    }

    componentDidMount() {
        axios.get(
            `http://localhost:2001/auth/getProductDetail+*/${this.props.match.params.id}`
        ).then(res => { 
            this.setState({product: res.data})
        })
    }

    render() {
        if(this.state.product){
        return (
            <div className='card col-5 my-5 mx-auto'>
                <div className='card-header mt-2'>
                    <h2>{this.state.product.name}</h2>
                </div>
                <div className='card-body'>
                    <img clasName='card-img-top' src={this.state.product.picture}/>
                    <h3>Name : {this.state.product.item}</h3>
                    <p>Description : {this.state.product.description}</p>
                    <p>Harga : Rp.{this.state.product.price}</p>
                </div>
                <form><input className ='form-control' type="text"/></form>
                <button className='btn btn-block-secondary mt-2'>Add To Cart</button>
          </div>
           )
        }else{
            return <div><h1 className='text-center'>Loading</h1></div>
        }
    }
}

export default ProductDetail