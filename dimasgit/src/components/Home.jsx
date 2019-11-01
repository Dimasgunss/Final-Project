import React, { Component } from 'react'
import axios from 'axios'
import './Home.css'
import Carousel from './Carousel'
import ProductItem from './ProductItem'

// import Footer from './footer'


export default class Home extends Component {

    state = {
        product: [],
        searchProducts: []
    }

    componentDidMount() {
        axios.get(
            'http://localhost:2001/auth/getproduct'

        ).then(res => {
            this.setState(
                {
                    products: res.data,
                    searchProducts: res.data
                }
            )

        })
    }

    renderList = () => {
        // products = [{}, {}, {}]
        // product = {id, name, description, price, picture}
        return this.state.searchProducts.map((product) => {
            return (
            
                <div className='col-4'>
                     <ProductItem barang={product} key={product.id} />
                </div>
            )
          
        })

    }



    render() {
        return (
            <div className='container container-height'>
                <div>
                    <Carousel />
                </div>
                <div className="row ">
                    {this.renderList()}
                    {/* <Footer/> */}
                </div>
            </div>
        )
    }
}
