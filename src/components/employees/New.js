import React from 'react'
import _ from 'lodash'
import axios from '../../config/axios';

import FormError from '../common/FormError'
import EmployeeForm from './Form'

export default class EmployeeNew extends React.Component {
    constructor() {
        super() 
        this.state = {
            errors: {}
        }
    }

    handleSubmit = formData => {
        axios.post('/employees', formData, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                if(response.data.errors) {
                    const errors = response.data.errors
                    this.setState({errors})
                } else {
                    //redirect
                    this.props.history.push('/employees')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h2>Add Employee</h2>
                {
                    !_.isEmpty(this.state.errors) && <FormError errors=
                    {this.state.errors} />
                }
                <EmployeeForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }

}