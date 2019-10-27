import React from 'react'
import Select from 'react-select'
import axios from '../../config/axios';

export default class TicketForm extends React.Component {
    constructor() {
        super()
        this.state = {
           selectedCustomerOption: '',
           customers: [],
           customer: '',
           selectedDepartmentOption: '',
           departments: [],
           code: '',
      //     department: '',
           employees: [],
           priority: '',
           selectedEmployeeOption: '',
           message: '',
           isHigh: false,
           isMedium: false,
           isLow: false
        }
        this.employeesInfo = []
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
                    this.employeesInfo = response.data
                    console.log(response.data)
                    this.setState({employees})
                })
                .catch(err => {
                    console.log(err)
                })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            code: this.state.code,
            customer: this.state.selectedCustomerOption._id,
            message: this.state.message,
            department: this.state.selectedDepartmentOption._id,
            priority: this.state.priority,
            employees: this.state.selectedEmployeeOption.map(option => {
                return {"_id": option._id}
            })
        }
        console.log("Form data to be submitted to backend: ", formData)
        this.props.handleSubmit(formData)

        this.setState({
            selectedCustomerOption: '',
            selectedDepartmentOption: '',
            selectedEmployeeOption: '',
            message: '',
            code: '',
            priority: ''
        })
    }

    handleChange = (e) => {
        console.log("Event: ", e)
        const target = e.target
        console.log("Event Target: ", target)
        const name = target.name
     //   const value = target.type === 'radio' ? !this.state.name : target.value
        const value = target.value
        this.setState({
            [name]: value
        })
    }

    handleCustomerChange = (selectedCustomerOption) => {
        console.log(`Customer Option selected: `, selectedCustomerOption);
        this.setState({ selectedCustomerOption });
        console.log(`Customer Option selected: `, selectedCustomerOption);
    }

    handleDepartmentChange = (selectedDepartmentOption) => {
        console.log("Selected Department: "+selectedDepartmentOption._id)
        const employees = this.employeesInfo.filter(employee => employee.department._id === selectedDepartmentOption._id)
        console.log('this.employeesInfo', this.employeesInfo, 'filterd employees', employees)

        this.setState({ selectedDepartmentOption, employees });
        // console.log(`Option selected: `, selectedDepartmentOption);
    }

    handleEmployeeChange = (selectedEmployeeOption) => {
        this.setState({ selectedEmployeeOption })
        console.log(`Employee Option selected: `, selectedEmployeeOption);
    //    console.log(`Employee Option selected id: `, selectedEmployeeOption[0]._id);
    }

    render() {
        console.log('render', this.state)
        return (
            <div>
                <h2>Add Ticket</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Code
                    </label>
                    <input type="text" value={this.state.code} onChange={this.handleChange} name="code"/>
                    <br />
                    <label>
                        Name
                    </label>
                    <Select value={this.state.selectedCustomerOption} 
                            options={
                                this.state.customers.map(customer => {
                                    return Object.assign(customer, {value: customer._id, label: customer.name})
                                })
                            } 
                            onChange={this.handleCustomerChange}/>
                    <label>
                        Department
                    </label>
                    <Select value={this.state.selectedDepartmentOption} 
                            options={
                                this.state.departments.map(department => {
                                    return Object.assign(department, {value: department._id, label: department.name})
                                })
                            } 
                            onChange={this.handleDepartmentChange}/>
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
                        <input type="radio" value="high" onChange={this.handleChange} name="priority"/> High
                        <input type="radio" value="medium" onChange={this.handleChange} name="priority"/> Medium
                        <input type="radio" value="low" onChange={this.handleChange} name="priority"/> Low
                    </div>
                    <textarea value={this.state.message} onChange={this.handleChange} rows={10} cols={100} name="message"/>
                    <br />
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}