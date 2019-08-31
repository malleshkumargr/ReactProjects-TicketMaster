import React from 'react'
import Select from 'react-select'
import axios from '../../config/axios';

export default class Ticket extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedCustomerOption: '',
            customers: [],
            selectedDepartmentOption: '',
            departments: [],
            employees: [],
            selectedEmployeeOption: '',
            message: '',
            isHigh: false,
            isMedium: false,
            isLow: false
        }
    }

    componentDidMount() {
        axios.get('/customers', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const customers = response.data
                console.log(response.data)
                this.setState({customers})
            })
            .catch(err => {
                console.log(err)
            })
    
        axios.get('/departments', {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            .then(response => {
                 const departments = response.data
                 console.log(response.data)
               //  console.log(response.data._id)
                 this.setState({departments})
            })
            .catch(err => {
                console.log(err)
            })
        axios.get('/employees', {
                    headers: {
                        'x-auth': localStorage.getItem('token')
                    }
                })
                .then(response => {
                    const employees = response.data
                    console.log(response.data)
                    this.setState({employees})
                })
                .catch(err => {
                    console.log(err)
                })
    }

    handleSubmit = () => {

    }

    handleChange = (e) => {
        const target = e.target
        const name = target.name
     //   const value = target.type === 'radio' ? !this.state.name : target.value
        const value = target.value
        this.setState({
            [name]: value
        })
    }

    handleCustomerChange = (selectedCustomerOption) => {
        this.setState({ selectedCustomerOption });
        console.log(`Option selected:`, selectedCustomerOption);
    }

    handleDepartmentChange = (selectedDepartmentOption) => {
        console.log("Selected Department: "+selectedDepartmentOption._id)
        this.setState({ selectedDepartmentOption });
        console.log(`Option selected:`, selectedDepartmentOption);
    }

    handleEmployeeChange = (selectedEmployeeOption) => {
        this.setState({ selectedEmployeeOption })
        console.log(`Option selected:`, selectedEmployeeOption);
    }

    render() {
        console.log('render', this.state)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name
                    </label>
                    <Select value={this.state.selectedCustomerOption} 
                            options={
                                this.state.customers.map(customer => {
                                    return Object.assign(customer, {value: customer._id, label: customer.name})
                                })
                            } 
                            onChange={this.handleCustomerChange} />
                    <label>
                        Department
                    </label>
                    <Select value={this.state.selectedDepartmentOption} 
                            options={
                                this.state.departments.map(department => {
                                    return Object.assign(department, {value: department._id, label: department.name})
                                })
                            } 
                            onChange={this.handleDepartmentChange} />
                    <label>
                        Employees
                    </label>
                    <Select value={this.state.selectedEmployeeOption} 
                            options={
                                this.state.employees.map(employee => {
                                    return Object.assign(employee, {value: employee._id, label: employee.name})
                                })
                            } 
                            onChange={this.handleEmployeeChange} isMulti={true}/>
                    <br />
                    <div>
                        <input type="radio" value="high" checked={this.state.isHigh} onChange={this.handleChange} name="priority"/> High
                        <input type="radio" value="medium"  checked={this.state.isMedium} onChange={this.handleChange} name="priority"/> Medium
                        <input type="radio" value="low" checked={this.state.isLow} onChange={this.handleChange} name="priority"/> Low
                    </div>
                    <textarea value={this.state.message} onChange={this.handleChange} rows={10} cols={100} name="message"/>
                    <br />
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}