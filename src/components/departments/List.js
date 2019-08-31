import React from 'react'
import _ from 'lodash'
import axios from '../../config/axios'
import DepartmentForm from './Form'
import FormError from '../common/FormError'

export default class DepartmentList extends React.Component {
    constructor() {
        super()
        this.state = {
            departments: [],
            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
   
    componentDidMount() {
        axios.get('/departments', {
            headers: {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response => {
            const departments = response.data
            this.setState({ departments })
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleSubmit(formData) {
        console.log('list formdata', formData)
        axios.post('/departments', formData, {
            headers: {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response => {
            if(response.data.errors) {
               console.log("Entered Error condition code block", response.data, response.data.errors)
               const errors = response.data.errors
               this.setState({ errors })
            } else {
                console.log("Entered good condition code block")
                const department = response.data
                this.setState(prevState => ({
                    departments: [...prevState.departments, department],
                    errors: {}
                }))
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    // handleRemove(id) {
    //     const handleRemove = window.confirm("Are you sure?")
    //     if(handleRemove) {
    //         axios.delete(`/departments/${id}`, {
    //             headers: {
    //                 'x-auth': localStorage.getItem('token')
    //             }
    //         })
    //             .then(response => {
    //                 this.setState(prevState => {
    //                     return {
    //                         departments: prevState.departments.filter(department => department._id !== response.data._id)
    //                     }
    //                 })
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    // }

    handleRemove = id => {
        const handleRemove = window.confirm('Are you sure?')
        if(handleRemove) {
            axios.delete(`/departments/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then(response => {
                    this.setState(prevState => ({
                     //   return {
                            departments: prevState.departments.filter(department => department._id !== response.data._id)
                   //     }
                    }))
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    render() {
        console.log('render method this state', this.state)
        console.log('render method this state errors', this.state.errors)
        console.log("is empty: ", _.isEmpty(this.state.errors))
        return (
            <div>
                <h2>List of Departments - {this.state.departments.length} </h2>
                
                {
                    !_.isEmpty(this.state.errors) && <FormError errors=
                    {this.state.errors} />
                }

                <DepartmentForm handleSubmit={this.handleSubmit} />

                <ul>
                    { this.state.departments.map(department => {
                        return <li key={department._id}> { department.name }
                                <button onClick={() => {
                                    this.handleRemove(department._id)
                                }}> remove </button>
                                </li>
                    })}
                </ul>
            </div>
        )
    }
}
