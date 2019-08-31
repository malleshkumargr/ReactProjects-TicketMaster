import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

export default class CustomerList extends React.Component {
    constructor() {
        super()
        this.state = {
            customers: [],
            searchText: ''
        }
        this.customersInfo = []
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        axios.get('/customers', {
            headers: {
                'x-auth' : localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log(response.data)
                const customers = response.data
                this.customersInfo = customers
                this.setState({ customers })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange(e) {
        const searchText = e.target.value
        console.log('searchText', searchText)

        this.setState({
            searchText,
            customers: this.customersInfo.filter(customer => {
                                return (customer.name.includes(searchText) || 
                                        customer.email.includes(searchText) || 
                                        customer.mobile.includes(searchText)
                                        )
                        })

        })
    }

    render() {
        console.log('render', this.state)
        return (
            <div>
                <h2>List of customers - { this.state.customers.length }</h2>
            
                <input type="text" value={this.state.searchText} onChange={this.handleChange} name="searchText" placeholder="search....."/>

                <table>
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Mobile </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.customers.map((customer, index) => {
                            return (
                                <tr key={customer._id}>
                                    <td> {index + 1} </td>
                                    <td><Link to={`/customers/${customer._id}`}> {customer.name} </Link></td>
                                    <td> {customer.email} </td>
                                    <td> {customer.mobile} </td>
                                    <td> <Link to={`/customers/${customer._id}`}>Show</Link></td>
                                </tr>
                            )

                        })}
                    </tbody>
                </table>

                <Link to="/customers/new">Add Customer</Link>
            </div>
        )
    }
}