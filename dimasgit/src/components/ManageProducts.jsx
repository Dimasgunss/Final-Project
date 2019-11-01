import React, {Component} from 'react'
import axios from 'axios'

class ManageProducts extends Component {

    state = {
        products : [],
        selectedId : 0,
        selectedName : '',
        selectedDesc : '',
        selectedPrice : '',
        selectedId : ''
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(
            'http://localhost:2001/auth/getproduct',

        ).then((res) => {
            this.setState(
                {
                    products: res.data,
                    selected: 0
                }
            )
        }).catch((err) => {
            console.log(err);
            
        })
    }

    onAddProduct = () => {
        let data_name = this.name.value
        let data_description = this.desc.value
        let data_price = this.price.value
        let data_picture = this.pict.value

        axios.post(
            'http://localhost:2001/auth/listproduct',

            {
                name: data_name,
                description: data_description,
                price: data_price,
                picture: data_picture
            }
        ).then((res) => {
            alert('Behasil input')

            this.getData()

        }).catch((err) => {
            console.log(err);
            alert('Failed')
            
        })
    }

    onEditClick = (idProduct, product) => {
        this.setState(
            {
                selectedId: idProduct,
                selectedName: product.name,
                selectedDesc: product.description,
                selectedPrice: product.price,
                selectedPict: product.picture
            }
        )
    }

    onCancelClick = () => {
        this.setState({selectedId: 0})
    }

    onSaveClick = (idProduct) => {
        axios.patch(
            `http://localhost:2001/auth/updateproduct/?id=${idProduct}`,

            {
                name: this.state.selectedName,
                description: this.state.selectedDesc,
                price: this.state.selectedPrice,
                picture: this.state.selectedPict
            }   
            
        ).then((res) => {
            alert('alhamdulillah')
            this.getData()
        })
        .catch((err) => {
            alert("gagal")
            console.log(err);
            
        })
    }

    renderList = () => {
        // Map data object menjadi list
        // products = [{}, {}, {}]
        // product = {name, description, price, picture, id}
        // hasilrender = [<tr>, <tr>, <tr>]
        let hasilRender = this.state.products.map((product)=>{
            
            // Jika id tidak sama dg yang terdaftar di state
            if(product.id != this.state.selectedId){
                // render sebagai list
                return (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>
                            <img style={{width: '45px'}} src={product.picture}/>
                        </td>
                        <td>
                            <button 
                                className='btn btn-outline-warning'
                                onClick={() => {this.onEditClick(product.id, product)}}>
                                Edit
                            </button>
                        </td>
                    </tr>
                )
            } else {
                // render sebagai textbox
                return (
                    <tr key={product.id}>
                        <td>
                            <input type='text' size={8}
                            className='form-control'
                            value={this.state.selectedName}
                            onChange={(e) => {this.setState({selectedName: e.target.value})}}/>
                        </td>
                        <td>
                            <input type='text' size={8}
                            className='form-control'
                            value={this.state.selectedDesc}
                            onChange={(e) => {this.setState({selectedDesc: e.target.value})}}/>
                        </td>
                        <td>
                            <input type='text' size={8}
                            className='form-control'
                            value={this.state.selectedPrice}
                            onChange={(e) => {this.setState({selectedPrice: e.target.value})}}/>
                        </td>
                        <td>
                            <input type='text' size={8}
                            className='form-control'
                            value={this.state.selectedPict}
                            onChange={(e) => {this.setState({selectedPict: e.target.value})}}/>
                        </td>
                        <td>
                            <button 
                                className='btn btn-outline-success mr-2'
                                onClick={() => {this.onSaveClick(product.id)}}
                            >
                                Save
                            </button>
                            <button 
                                className='btn btn-outline-danger'
                                onClick={this.onCancelClick}
                            >
                                Cancel
                            </button>
                        </td>
                    </tr>
                )
            }
        })

        return hasilRender
    }

    render() {
        return (
            <div className='container'>
                <h1 className='display-4 text-center'>List Product</h1>
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>DESC</th>
                            <th>PRICE</th>
                            <th>PICTURE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>


                <h1 className='display-4 text-center'>Input Product</h1>
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>DESC</th>
                            <th>PRICE</th>
                            <th>PICTURE</th>
                            <th>ACTION  </th>
                        </tr>
                    </thead>
                    <tbody>
                       <tr>
                           <td><input ref={(input) => {this.name = input}} className='form-control' type='text' /></td>
                           <td><input ref={(input) => {this.desc = input}} className='form-control' type='text' /></td>
                           <td><input ref={(input) => {this.price = input}} className='form-control' type='text' /></td>
                           <td><input ref={(input) => {this.pict = input}} className='form-control' type='text' /></td>
                           <td>
                               <button 
                                   className='btn btn-outline-success'
                                   onClick={this.onAddProduct}
                               >Add</button>
                           </td>
                       </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}

export default ManageProducts