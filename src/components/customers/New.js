import React from 'react'
import _ from 'lodash'
import axios from '../../config/axios'
import FormError from '../common/FormError'
import CustomerForm from './Form'

export default class CustomerNew extends React.Component {
    constructor() {
        super()
        this.state = {
            errors: {}
        }
    }

    handleSubmit = formData => {
        console.log('new', formData)
        axios.post('/customers', formData, {
            headers: {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response => {
            if(response.data.errors) {
                // alert(response.data.message)
                const errors = response.data.errors
                this.setState({ errors })
            } else {
                // redirect
                this.props.history.push('/customers')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        console.log('render - customer new')
        return (
            <div>
                <h2>Add Customer</h2>
                {
                    !_.isEmpty(this.state.errors) && <FormError errors=
                    {this.state.errors}/>
                }
                <CustomerForm handleSubmit={this.handleSubmit} title="New.js"/>
            </div>
        )
    }
}