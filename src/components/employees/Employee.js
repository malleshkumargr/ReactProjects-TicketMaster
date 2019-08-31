import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

export default class Employee extends React.Component {
    constructor() {
        super()
        this.state = {
            employee: {}
        }
    }

    componentDidMount() {
        const empId = this.props.match.params.id
        axios.get(`/employees/${empId}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log(response.data)
                const employee = response.data
                this.setState({employee})
            })
            .catch(err => {
                console.log(err)
            })   
    }

    render() {
        return (
            <div>
                <p>Employee Name: {this.state.employee.name}</p>
                <p>Employee Email: {this.state.employee.email}</p>
                <p>Employee Mobile: {this.state.employee.mobile}</p>
                <p>Employee Department: {this.state.employee.department && this.state.employee.department.name}</p>
                <Link to="/employees">Back to Employees</Link>
            </div>
        )
    }
}