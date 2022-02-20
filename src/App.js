import './App.css';
import React, { Component } from 'react'
import ProductList from './Components/ProductList';
import Form from './Components/Form';
import GetProduct from './Components/GetProduct';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAddProduct: false,
      isEditProduct: false,
      isDeleteProduct: false,
      singleProduct: {},
      error: null,
      response: {},
      product: '',
      productId: ''

    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onDeleteProduct = this.onDeleteProduct.bind(this);
    this.onGetProduct = this.onGetProduct.bind(this);



  }
  onCreate() {
    this.setState({ isAddProduct: true })
  }
  onstart() {
    this.setState({
      isReadMore: false,
    })
  }
  onFormSubmit(data) {
    let url = 'https://jsonplaceholder.typicode.com/posts'

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        title: data.title,
        body: data.body,
        userId: data.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          response: json,
          isAddProduct: false,
          isEditProduct: false,
          isReadMore: false,
          isReadMore: false,
          product: 'add'

        })
      },
        error => {
          this.setState({ error })
        }
      );
  }
  editProduct = prodId => {
    this.setState({
      isEditProduct: true,
      productId: prodId
    })

  }

  onEditSubmit(data) {
    // console.log(data)
    console.log(this.state.productId)
    let url = 'https://jsonplaceholder.typicode.com/posts/' + this.state.productId;
    console.log(url)
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        id: this.state.productId,
        title: data.title,
        body: data.body,
        userId: data.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          response: json,
          isAddProduct: false,
          isDeleteProduct: false,
          isEditProduct: false,
          isReadMore: false,
          product: 'edit'
        })
        console.log(this.state.response)
      },
        error => {
          this.setState({ error })
        }
      );
  }

  onDeleteProduct(id) {
    this.setState({
      isDeleteProduct: true,
      isAddProduct: false,
      isEditProduct: false,
      product: 'delete'

    })
    let url = 'https://jsonplaceholder.typicode.com/posts/' + id
    fetch(url, {
      method: 'DELETE',
    });
  }

  onGetProduct(id) {
    fetch('https://jsonplaceholder.typicode.com/posts/' + id)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          response: json,
          isReadMore: true
        })
      },
        error => {
          this.setState({ error })
        }
      );
  }
  closeAlert() {
   let time =  setTimeout(() => {
      this.setState({
        product: ''
      })
    }, 2000)
  }

  render() {
    return (
      <div>
        <div><h3>Simple CRUD Application</h3></div>

        {/* Showing Alerts after addition/updation/deletion */}
        {this.state.product == 'add' && <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Response Successfully Added!</strong > 
        </div> }

        {this.state.product == 'edit' && <div className="alert alert-success fade show" role="alert">
          <strong>Record Successfully Updated!</strong>
        </div>}
        {this.state.product == 'delete' && <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Record Successfully Deleted!</strong>
        </div> }

        {!this.state.isAddProduct && !this.state.isEditProduct && !this.state.isReadMore && <button className="btn btn-primary add my-3" onClick={() => this.onCreate()}>Add Product</button>}
        {!this.state.isAddProduct && !this.state.isEditProduct && !this.state.isReadMore && <ProductList editProduct={this.editProduct} onDeleteProduct={this.onDeleteProduct} getProduct={this.onGetProduct} />}
        {(this.state.isAddProduct || this.state.isEditProduct) && <Form onFormSubmit={this.state.isAddProduct ? this.onFormSubmit : this.onEditSubmit} />}
        {this.state.isReadMore && <button className="btn btn-primary backbtn my-3" onClick={() => this.onstart()}>Back</button>}
        {this.state.isReadMore && <GetProduct response={this.state.response} />}

        {/* To dismiss alert after 2 seconds */}
        {!this.state.product=='' && this.closeAlert()}


      </div>
    )
  }
}
