import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as studentRecordActionCreators from '../../actions/studentRecordActions'

class StudentLandingPage extends Component {
  
  componentWillMount(){
    const { student, getStudentRecord } = this.props
    if(student){
      getStudentRecord(student.username)
    }
  }

  componentWillReceiveProps(nextProps){
    const { student, getStudentRecord } = this.props
    if(student !== nextProps.student && nextProps.student.username){
      getStudentRecord(nextProps.student.username)
    }
  }
  
  render(){
      const { student } = this.props
      return (
        <div>
          {
            student
            && (
            <div>
              <h1>
      Welcome
                {' '}
                {student.firstName}
              </h1>
              <div>
                <Link to="/student-records">My Teacher</Link>
                <br />
                <Link to="/schedule">Choose a class</Link>
                <br />
                <Link to="class">Start Class</Link>
              </div>
            </div>
            )
      
          }
        </div>
      )
    }
  }

StudentLandingPage.defaultProps = {
  student: null,
}

StudentLandingPage.propTypes = {
  getStudentRecord: PropTypes.func.isRequired,
  student: PropTypes.object,
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...studentRecordActionCreators,
  }, dispatch)
}


function mapStateToProps(state) {
  return {
    ...state.student,
    ...state.studentAuthentication,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentLandingPage)
