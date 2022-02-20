import React, { Component } from 'react'

export default class GetProduct extends Component {
    style = {
        width: "70%"
    }

    render() {
        return (
            <>
                <h2 className='leftmargin'>Get Single Response</h2>
                <div >
                    <table className='container my-2' style={this.style}>
                        
                        <tbody>
                            <tr>
                                <td class='rightmarginBg'>ID : </td>
                               <td>{this.props.response.id}</td> 
                            </tr>
                            <tr>
                                <td>USER_ID: </td>
                               <td>{this.props.response.userId}</td> 


                            </tr><tr>
                                <td>TTILE : </td>
                               <td>{this.props.response.title}</td> 


                            </tr><tr>
                                <td>BODY : </td>
                               <td>{this.props.response.body}</td> 


                            </tr>
                        </tbody>
                    </table>


                </div>
            </>

        )
    }
}
