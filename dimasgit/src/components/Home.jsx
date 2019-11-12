import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import './Home.css'
import Carousel from './Carousel'
import ProductItem from './ProductItem'
import Navbar from './Navbar'
// import Footer from './footer'

class Home extends Component {

    state = {
        products: []
    }

    getProductItem = () => {
        axios.get(
            'http://localhost:2001/auth/getproduct'

        ).then(res => {
            this.setState(
                {
                    products: res.data
                }
            )

        })
    }



    componentDidMount() {
       if(!this.props.key_word) {
           this.getProductItem()
       }
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps.key_word)
        console.log(this.props.key_word)
        if (prevProps.key_word != this.props.key_word) {
            this.hasilPencarian()
        }
    }

    hasilPencarian = () => {
        axios.get(`http://localhost:2001/auth/searchproduct`, {
            params: {
                input: this.props.key_word
            }
        })
        .then(res => {
            this.setState({
                products: res.data
            })
        })
    }



    renderList = () => {
        // console.log(this.state.products)
        // products = [{}, {}, {}]
        // product = {id, name, description, price, picture}
        return this.state.products.map((product) => {
            return (
            
                <div className='col-4'>
                     <ProductItem barang={product} key={product.id} />
                </div>
            )
          
        })

    }




    render() {
        return (
            <div>
                <div>
                    <Navbar/>   
                </div>
         
            <div className='container container-height'>
                <div>
                    <Carousel />
                </div>
                <div className="row ">
                    {this.renderList()}
                    {/* <Footer/> */}
                </div>
            </div>
            </div>
        )
    }
}

const mstp = state => {
    return {
        key_word: state.search.keyword
    }
}


export default connect(mstp) (Home)