import React, {Component} from 'react'
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios'
import './Register.css'

class ProductItem extends Component {

render() {
    let {id, name, price, picture} = this.props.barang

        return (
            <div className='card mt-5 '>
                <img src={picture} className='card-img-top w-100 container pt-2  '/>
                <div className='card-body'>
                    <h5 className='card-tittle'>{name}</h5>
                    <p className='card-text' style={{color:'re'}}>{price}</p>
                    <input ref={input => this.qty = input} className='form-control mb-2' type="number"/>
                    <NavLink to={`/productdetail/${id}`}>
                        <button className='btn btn-block btn-btn-outline-primary my-2'>Detail</button>
                    </NavLink>
                   <NavLink to={`/cart`}>
                      <button className='btn btn-block btn-outline-dark'>Add To Cart</button>
                   </NavLink>
                </div>                
            </div>
        )
    }
}

export default ProductItem