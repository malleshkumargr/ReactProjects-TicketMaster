import React from 'react'
import axios from '../../config/axios';
import { Link } from 'react-router-dom'

export default class EmployeeList extends React.Component {
    constructor() {
        super()
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        axios.get('/employees', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log(response.data)
                const employees = response.data
                this.setState({ employees })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h2>List of Employees - {this.state.employees.length}</h2>
                <table>
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Mobile </th>
                            <th> Department </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map((employee, index) => {
                            return (
                                <tr key={employee._id}>
                                    <td> {index + 1} </td>
                                    <td><Link to={`/employees/${employee._id}`}>{employee.name}</Link></td>
                                    <td> {employee.email} </td>
                                    <td> {employee.mobile} </td>
                                    <td> {employee.department.name} </td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
                {/* <ul>
                    {this.state.employees.map(employee => {
                        return <li key={employee._id}>{employee.name}</li>
                    })}
                </ul> */}
                <Link to="/employees/new">Add Employee</Link>
            </div>
        )
    }

}