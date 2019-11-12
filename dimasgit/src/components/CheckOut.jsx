import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './CheckOut.css'


class CheckOut extends React.Component {

    state = {
        id: 0,
        cart : [],
        totalQty : 0,
        totalharga: 0,
        checkout: [],

    }

    componentDidMount() {
        this.getData();
        console.log(this.state.cart);
        console.log(this.state.checkout);
        
    }
    

    getData = () => {
        axios.get('http://localhost:2001/auth/getdatacarts', 
         {
            params : {
                userId : this.props.userId
            }
         }
            )
            .then((res) => {
                console.log(res.data);
                
                this.setState({
                    cart: res.data
                })
                this.qtyTotal()
                this.hitungTotal()
        }).catch(err => {
            console.log(err);
            
        })

    }


   btnDelete = (id)=> {
    
    console.log(id)
    
    axios.post(`http://localhost:2001/auth/deletecartsproduct`,
    {
        id: id
    }
    ).then((res) => {
      this.getData()
      
    }).catch((err) => {
        console.log(err);
        
    })
   
   } 

    renderList = () => {

        console.log(this.state.id)
        
        return this.state.cart.map((val, index) => {
            return (

                <div id='bordercart' className ='row'>
                    <div id='isicart'>

                <div key={index}>
                    <div className='row'>
                    <img style={{width : '100px', marginLeft: '20px'}} src={val.picture}/>
                    <div className='namaProduct'>
                    <button id='btncart' className='btn btn-outline-danger' onClick={() => this.btnDelete(val.cartId)}>
                            Delete
                    </button>
                    <div className='namaisiproduct'>
                     <h4>{val.name}</h4>
                    <hr/>
                    <h6>Rp : {val.price}</h6>
                    <h6>Description : {val.desc}</h6>
                    </div>
                    </div>
                    <div>
                    </div>
                    </div>
                    <div>
                     <input id='qty' value ={val.qty} className='form-control text-center' />
                     
                    </div>
                </div>
                    </div>

                    
                </div>   
            )
        })
    }

    hitungTotal = () => {
        let total = 0

        for (let i=0 ; i<this.state.cart.length; i++){
                total += (this.state.cart[i].price * this.state.cart[i].qty)
        }
        this.setState({
            totalharga: total
        })

        return total
    }

   qtyTotal = () => {
        // this.state.jumlahTotal = 0
        // for (let i = 0; i < this.state.detail.length; i++) {
        //     this.state.jumlahTotal += (this.state.detail[i].jumlah)
        // }
        // return this.state.jumlahTotal
        let total = 0
        for (let i = 0; i < this.state.cart.length; i++) {
            total += (this.state.cart[i].qty)
        }
        // console.log(this.state.detail[0]);
        this.setState({
            totalQty: total
        })

    }


    render() {
        return (
            <div>
               <div style={{paddingTop: '100px'}}>
                 <div className='table row'>
                  <div className='pesan'>

            <tbody>
                <div id='alamat'>
                    <h5 className='font-weight-bold'>Checkout</h5>
                    <h6 className='font-weight-bold'>Alamat Pengiriman</h6>
                    <hr/>

                    <h5 className='font-weight-bold'>{this.props.user_name}</h5>
                    <hr/>
                </div>
                {this.renderList()}
                
            </tbody>
                  </div>

               
                <div className="total">
                       <h5 className='mt-4 ml-2'>Rincian Harga</h5>
                    <hr/>
                        <div className='row'>
                            <h6 className='ml-4'>Total Harga Barang</h6>
                            <h5 id='inputjmlpesanan'/>Rp. {this.state.totalharga} <h5/>
                        </div>
                        <div className='row'>
                            <h6 className='ml-4'>Total Barang</h6>
                            <h5 style={{marginRight: '70%'}}/>{this.state.totalQty} <h5/>
                        </div>
                        <div className='my-4'>
                            <button type="button" className="btn-block btn-primary">Pembayaran</button>
                           
                        </div>
                        <div className='text-center'>
                     
                        </div> 
                    </div>
                 </div> 
              </div>        
            </div>
        )
    }
}


const mstp = state => {
    return {
        user_name: state.auth.username,
        userId: state.auth.id,
        totalQty: state.cartReduc.totalQty
    }
}

export default connect (mstp) (CheckOut)