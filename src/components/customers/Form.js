import React from 'react'

export default class CustomerForm extends React.Component {
    constructor(props) {
        console.log(props.customer)
        console.log('constructor - customer form')
        super(props)
        this.state = {
            name: props.customer ? props.customer.name : '',
            email: props.customer ? props.customer.email: '',
            mobile: props.customer ? props.customer.mobile: ''
        }
    }

    handleSubmit = e => {
        console.log('handle submit - customer form')
        console.log(this.props)
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile
        }

        this.props.handleSubmit(formData)
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        console.log('render - customer form', this.props)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">
                        name
                    </label>
                    <input type="text" value={this.state.name} name="name" id="name" onChange={this.handleChange} />
                    <br />
                    <label htmlFor="email">
                        email
                    </label>
                    <input type="text" value={this.state.email} name="email" id="email" onChange={this.handleChange} />
                    <br />
                    <label htmlFor="mobile">
                         mobile
                    </label>
                    <input type="text" value={this.state.mobile} name="mobile" id="mobile" onChange={this.handleChange} />
                    <br />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}