import React from 'react'
import axios from '../../config/axios';
import _ from 'lodash'
//import { Progress } from 'reactstrap'

import TicketForm from './Form'
import FormError from '../common/FormError'

const tableStyle = {
    border: '1px solid black'
}

export default class TicketList extends React.Component {
    constructor() {
        super()
        this.state = {
            tickets: [],
            customers: [],
            departments: [],
            searchByCode: '',
            errors: {},
            isTicketResolved: false
       }
       this.ticketsInfo = []
    }

    componentDidMount() {
       
        axios.get('/tickets', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const tickets = response.data
                this.ticketsInfo = response.data
                console.log("..................................................................tickets received: ", tickets)

                this.setState({tickets})

                // let customers = []
                // let departments = []
              
                // tickets.forEach(ticket => {
                //     console.log("........................................................entered for each loop", ticket, ticket.customer, ticket.department)
                //     axios.get(`/customers/${ticket.customer}`, {
                //         headers: {
                //             'x-auth': localStorage.getItem('token')
                //         }
                //     })
                //         .then(response => {
                //             console.log("..................................................customer response: ", response.data, response.data.name)
                //             customers.push(response.data.name)
                //             console.log('.......................Customers: ', customers)
                //             this.setState({customers})
                //         })
                //         .catch(err => {
                //             console.log(err)
                //         })

                    // axios.get(`/departments/${ticket.department}`, {
                    //     headers: {
                    //         'x-auth': localStorage.getItem('token')
                    //     }
                    // })
                    //     .then(response => {
                    //         console.log("....................................................department response: ", response.data, response.data.name)
                    //         departments.push(response.data.name)
                    //         console.log('Departments: ', departments)
                    //         this.setState({departments})
                    //     })
                    //     .catch(err => {
                    //         console.log(err)
                    //     })
                    //})
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange = (e) => {
        const target = e.target
        const name = target.name
        console.log('target.checked: ', target.checked, target.type, name)
        const value = target.type === 'checkbox' ? target.checked : target.value

        
        if(target.type !== 'checkbox') {
           const tickets = this.ticketsInfo.filter(ticket => ticket.code.includes(value))
           this.setState({
                [name]: value,
                tickets
            })
        } else {
           this.setState({
               [name]: value
           })
        }

      //  console.log("handleChange Tickets: ", tickets)
      //  this.setState({ tickets })
        
    }

    // handleBlurChange = (e) => {
    //     const tickets = this.ticketsInfo.filter(ticket => ticket.code.includes(e.target.value))
    //     this.setState({ tickets })
    // }

    // getCustomerName = (id) => {
    //     let custname
    //     axios.get(`/customers/${id}`, {
    //         headers: {
    //             'x-auth': localStorage.getItem('token')
    //         }
    //     })
    //         .then(response => {
    //             console.log(response.data.name)
    //             custname = response.data.name
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         }) 

    //         return custname
    // }

    handleSubmit = (formData) => {
        axios.post('/tickets', formData, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                if(response.data.errors) {
                    console.log("Error Block Entered in Tickets Form: ", response.data.errors, response.data)
                    const errors = response.data.errors
                    this.setState({errors})
                } else {
                    console.log("Entered good ticket response block: ", response.data)
                    console.log('response.data', response.data)
                    const ticket = response.data
                    this.setState(prevState => ({
                        tickets: [...prevState.tickets, ticket],
                        errors: {}
                    }))
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        console.log('state', this.state)

        // <td>{this.state.customers[index]}</td>
        // <td>{this.state.departments[index]}</td>
        return (
            <div>
                <input type="text" value={this.state.searchByCode} placeholder="search by code"  onChange={this.handleChange} onBlur={this.handleBlurChange}  name="searchByCode"/>
                <h2>Listing Tickets - {this.state.tickets.length}</h2>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Employees</th>
                            <th>Priority</th>
                            <th>Message</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.tickets.map((ticket, index) => {
                            return (
                                <tr key={ticket._id}>
                                    <td>{ticket.code}</td>
                                     <td>{ticket.customer}</td>
                                    <td>{ticket.department}</td>
                                    <td> 
                                    <ul>
                                    {ticket.employees.map(employee => {
                                        return <li key={employee._id}>{employee._id}</li>
                                    })}
                                    </ul>
                                    </td>
                                    <td>{ticket.priority}</td>
                                    <td>{ticket.message}</td>
                                    <td>{ticket.isResolved ? 'Complete': (
                                        <label><input type="checkbox" name="isTicketResolved" checked={this.state.isTicketResolved} onChange={this.handleChange}/> Open</label>
                                    )}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <br />    
                <progress value="7" max={this.state.tickets.length}></progress>
                {
                    !_.isEmpty(this.state.errors) && <FormError errors=
                    {this.state.errors} />
                }
                <TicketForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}