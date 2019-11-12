import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import Navbar from './Navbar'

class Cart extends Component {

    state = {
        carts: [],
        checkout: null,
        loading: true,
        // checkoutShow: false
    }

    componentDidMount() {
        this.getData()
    }
    // componentDidUpdate(prevProps){
    //     console.log(prevProps.user_id)
    //     if (prevProps.user_id != this.props.user_id) {
    //         this.getData()
    //     }
    // }

     onCheckoutClick = () => {
        this.setState(state => {
            return {
                checkout: state.carts
            }
        })
    }

    getData = () => {
        // console.log(this.props.user_id)
            axios.get(
             'http://localhost:2001/auth/getdatacarts',
             {
                 params: {
                     userId : this.props.user_id
                 }
             }
         ).then(res => {
             console.log(res.data);
             
             this.setState({carts: res.data, loading: false})
         })
    }

    deleteProductCarts = (id) => {
        console.log(id);
        
        axios.post(
            'http://localhost:2001/auth/deletecartsproduct',
            {
                
                id: id
                
            }
        ).then(res => {
            console.log(res);
            
            this.getData()
        }).catch(err => {
            console.log(err);
            
        })
    }

    renderList = () => {
      return this.state.carts.map(cart => {

            return (
            <tr>
                <td>{cart.id}</td>
                <td>{cart.name}</td>
                <td>{cart.description}</td>
                <td>{cart.price}</td>
                <td>{cart.qty}</td>
                <td>
                    <img className='list' style={{width: '70px'}} src={cart.picture }/>
                </td>
                <td>
                    <button className='btn btn-outline-danger'
                        onClick={() => {this.deleteProductCarts(cart.cartId)}}>
                        Delete
                    </button>
                </td>
            </tr>
            )
        })
  
        // return (
        //     <tr>
        //         <td>{this.state.carts.id}</td>
        //         <td>{this.state.carts.productName}</td>
        //         <td>{this.state.carts.productDesc}</td>
        //         <td>{this.state.carts.productPrice}</td>
        //         <td>{this.state.carts.productQty}</td>
        //         <td>
        //             <img className='list' src={this.state.carts.productpict }/>
        //         </td>
        //         <td>
        //             <button className='btn btn-outline-danger'>
        //                 Delete
        //             </button>
        //         </td>
        //     </tr>
        // )
    }

    render() {
        // console.log(this.state.carts)
        // console.log(this.props.user_id)
        if (!this.state.loading) {
            if(this.props.user_id) {
                return (
                    <div>
                        <div>
                            <Navbar/>
                        </div>
                    <div>
                        <h1 className='display-4 text-center'></h1>
                        <table className='table text-center'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>DESC</th>
                                    <th>PRICE</th>
                                    <th>QTY</th>
                                    <th>PICTURE</th>
                                 
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderList()}
                            </tbody>
                        </table>
        
                            <div className='text-center'>
                                <Link to='/checkout'>
                                    <button className='btn btn-danger'>checkout</button>
                                </Link>
                            </div>
                            {/* onClick={() => this.setState({checkoutShow: true})} */}
                            {/* <checkout carts={this.state.checkout} /> */}
        
                    </div>
                {/* <div>
                  <Modal isOpen={this.state.checkoutShow} toggle={() => this.setState({checkoutShow: false})}>
                        <ModalHeader toggle={() => this.setState({checkoutShow: false})}>Modal title</ModalHeader>
                          <ModalBody>
                             Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </ModalBody>
                        <ModalFooter>
                      <Button color="primary" onClick={() => this.setState({checkoutShow: false})}>Do Something</Button>{' '}
                      <Button color="secondary" onClick={() => this.setState({checkoutShow: false})}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </div> */}
                </div> 
                )
            } else{
               return <Redirect to='/login'/>
            }
            // return (
            //     <div>
            //         <div>
            //             <Navbar/>
            //         </div>
            //     <div>
            //         <h1 className='display-4 text-center'></h1>
            //         <table className='table text-center'>
            //             <thead>
            //                 <tr>
            //                     <th>ID</th>
            //                     <th>NAME</th>
            //                     <th>DESC</th>
            //                     <th>PRICE</th>
            //                     <th>QTY</th>
            //                     <th>PICTURE</th>
            //                     <th>ACTION</th>
            //                 </tr>
            //             </thead>
            //             <tbody>
            //                 {this.renderList()}
            //             </tbody>
            //         </table>
    
            //             <div className='text-center'>
            //                 <button onClick={this.onCheckoutClick} className='btn btn-primary'>checkout</button>
            //             </div>
    
            //             <checkout carts={this.state.checkout} />
    
            //     </div>
            // </div>
            // )
        } else {
            return <h1>Loading</h1>
        }
       
    }
} 

const mstp = state => {
     return {
         user_id : state.auth.id
     }
}


export default connect(mstp)(Cart)