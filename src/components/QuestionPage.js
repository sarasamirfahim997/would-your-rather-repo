import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
class QuestionPage extends Component {
    render() {
        return (
            <div>
                <Question id={this.props.match.params.id} viewed />
            </div>
        )
    }
}

export default connect()(QuestionPage)