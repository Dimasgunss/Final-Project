import React, {Component} from 'react'
import {Link, NavLink, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import './Register.css'

class ProductItem extends Component {

    state = {
        product : [],
        selectedName: '',
        qty: 0,
        isDone: false
    }

    componentDidMount() {
        this.getData()
    }


    getData = () => {
        axios.get(
            "http://localhost:2001/auth/getproduct"
        ).then(res => {
            this.setState({
                products: res.data,
                selectId: 0
            })
        }).catch(err => {
            console.log(err);
            
        })
    }

    beli = () => {
        console.log(this.props.barang);
        console.log(this.props.barang.id);
        console.log(this.state.qty);
        console.log(this.props.userId);
        
        axios.post("http://localhost:2001/auth/postaddtocarts",
            {
                productId: this.props.barang.id,
                userId: this.props.userId,
                qty: this.state.qty
            }
        )
        .then(() => {
            this.setState({isDone: true})
        })
    }

render() {
    let {id, name, price, picture} = this.props.barang
        
        if (!this.state.isDone) {
            return (
                <div className='card mt-5 '>
                    <Link to='/cart'>
                      <img src={picture} className='card-img-top w-100 container pt-2' id='transition' />
                    </Link>
                    <div className='card-body'>
                        <h5 className='card-tittle'>{name}</h5>
                        <p className='card-text' style={{color:'red'}}>Rp. {price}</p>
                        <input onChange={e => this.setState({qty: e.target.value})} ref={input => this.qty = input} className='form-control mb-2' type="number"/>
                        <NavLink to={`/productdetail/${id}`}>
                            <button className='btn btn-block btn-btn-outline-primary my-2'>Detail</button>
                        </NavLink>
                        <button onClick={this.beli} className='btn btn-block btn-outline-dark'>Beli Sekarang</button>
                    </div>                
                </div>  
            )
        } else {
           return <Redirect to="/cart"/> 
        }
    }
}

const mstp = state => {
    return{
        userId: state.auth.id
    }
}

export default connect (mstp) (ProductItem)