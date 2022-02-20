
import { buildQueries } from '@testing-library/react';
import React, { Component } from 'react'
import Form from './Form';

import './Crud.css'

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            products: [],

        };
    }
    style = {
        width: "80%"
    }
    
    componentDidMount() {

        // Get request
        const url = 'https://jsonplaceholder.typicode.com/posts';
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        products: result.splice(0, 5)
                    })
                },
                (error) => {
                    this.setState({ error })
                })


    }
    render() {
        const { error, products } = this.state;
        if (error) {
            return (
                <div>Error : {error.message}</div>
            )
        }
        else {
            return (
                <div>
                    <>

                        {/* <button type="button" class="btn btn-primary add my-2">Add Details</button> */}
                        <table cellSpacing="0" cellPadding="0" className="container my-2" style={this.style}>
                            <thead >
                                <tr>
                                    <th className="rightmargin">ID</th>
                                    <th className="rightmarginBg">USER_ID</th>
                                    <th className='leftalign leftpadding'>TITLE</th>
                                    <th>ACTIONS</th>


                                </tr>
                            </thead>
                            <tbody>
                                {products.map(prod => (
                                    <tr key={prod.id}>
                                        <td>{prod.id}</td>
                                        <td>{prod.userId}</td>
                                        <td className='leftalign leftpaddingD'>{prod.title}</td>
                                        <td>
                                            <button type="button" className="btn btn-primary" onClick={() => this.props.getProduct(prod.id)}  >More</button>
                                            <button type="button" className="btn btn-success" onClick={() => this.props.editProduct(prod.id)}  >Edit</button>
                                            <button type="button" className="btn btn-danger" onClick={() => this.props.onDeleteProduct(prod.id)}>Delete</button>

                                        </td>

                                    </tr>
                                ))}
                            </tbody>



                        </table>

                    </>

                </div>
            )
        }
    }
}
