import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authenticationActionCreators from '../../actions/authenticationActions'

class studentLogin extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      showPassword: false,
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showPassword = this.showPassword.bind(this)
  }

  // componentWillReceiveProps(nextProps) {
  //   const { teacher, history } = this.props
  //   if (teacher !== nextProps.teacher) {
  //     history.push('/teacher')
  //   }
  // }

  handleUsernameChange(event) {
    const { target } = event
    this.setState(prevState => ({ ...prevState, username: target.value }))
  }

  handlePasswordChange(event) {
    const { target } = event
    this.setState(prevState => ({ ...prevState, password: target.value }))
  }

  handleSubmit(event) {
    event.preventDefault()
    const { username, password } = this.state
    const userInfo = {
      username,
      password,
    }
    const { loginStudent } = this.props
    loginStudent(userInfo)
  }

  showPassword() {
    const { showPassword } = this.state
    this.setState(prevState => ({ ...prevState, showPassword: !showPassword }))
  }

  render() {
    const { showPassword } = this.state
    return (
      <div>
        <h3>Student Login</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">
          Username:
            {' '}
            <input
              id="username"
              type="input"
              onChange={this.handleUsernameChange}
            />
          </label>
          <label htmlFor="password">
          Password:
            {' '}
            <input
              id="password"
              type={showPassword ? 'input' : 'password'}
              onChange={this.handlePasswordChange}
            />
          </label>
          <button type="button" onClick={this.showPassword}>
            {showPassword ? 'Hide Password' : 'Show Password'}
          </button>
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

studentLogin.defaultProps = {
  // student: null,
}

studentLogin.propTypes = {
  loginStudent: PropTypes.func.isRequired,
  // student: PropTypes.object,
  // history: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    ...state.studentAuthentication,
    ...state.student,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...authenticationActionCreators,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(studentLogin)
