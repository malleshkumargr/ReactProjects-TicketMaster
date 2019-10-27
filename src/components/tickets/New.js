import React from 'react'
import axios from '../../config/axios';
import _ from 'lodash'
import FormError from '../common/FormError'

import TicketForm from './Form'

export default class TicketNew extends React.Component {
    constructor(){
        super()
        this.state = {
            errors: {}
        }
    }

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
        return (
            <div>
                {
                    !_.isEmpty(this.state.errors) && <FormError errors=
                    {this.state.errors} />
                }
                <TicketForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

