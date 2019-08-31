import React from 'react'
import axios from '../../config/axios';

export default class EmployeeForm extends React.Component {
    constructor(){
        super()
        this.state = {
            name: '',
            email: '',
            mobile: '',
            department: '',
            departments: []
        }

    }

    componentDidMount() {
        axios.get('/departments', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log(response.data)
                const departments = response.data
                this.setState({departments})
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            department: this.state.department
        }

        this.props.handleSubmit(formData)
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">
                    name
                </label>
                <input type="text" name="name" value={this.state.name} id="name" onChange={this.handleChange} />
                <br/>
                <label htmlFor="email">
                    email
                </label>
                <input type="text" name="email" value={this.state.email} id="email" onChange={this.handleChange} />
                <br/>
                <label>
                    mobile
                </label>
                <input type="text" name="mobile" value={this.state.mobile} id="mobile" onChange={this.handleChange} />
                <br/>
                <select value={this.state.department} onChange={this.handleChange} name="department">
                    <option value="">select</option>
                    {
                        this.state.departments.map(department => {
                            return <option key={department._id} value={department._id}>{department.name}</option>
                        })
                    }
                </select>
                <br/>
                <input type="submit" />
            </form>
        )
    }
}