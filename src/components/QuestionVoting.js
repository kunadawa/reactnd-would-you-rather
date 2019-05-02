import React from 'react';
import {connect} from 'react-redux'
import {handleSaveQuestionAnswer} from '../actions/questions'
import {withRouter} from 'react-router-dom'
import PrivateComponent from "./PrivateComponent";
import {Redirect} from 'react-router-dom'

class QuestionVoting extends PrivateComponent {
    state = {
        chosenOption: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const answer = this.state.chosenOption
        const {dispatch, authedUser, question} = this.props
        const qid = question.id
        dispatch(handleSaveQuestionAnswer(
        { authedUser, qid, answer }
        ))
        this.props.history.push(`/question/${qid}/results`)
    }

    updateOption = (e) => {
        const value = e.target.value
        this.setState({
            chosenOption: value
        })
    }

    render() {
        const redirect = super.render()
        const {question, authedUser} = this.props
        if (question) {
            const optionOneAnswered = question.optionOne.votes.includes(authedUser)
            const optionTwoAnswered = question.optionTwo.votes.includes(authedUser)
            return optionOneAnswered || optionTwoAnswered
                ? <Redirect to={`/question/${question.id}/results`}/>
                : (
                    <div>
                        {redirect}
                        <h3>Would you rather?</h3>
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor='optionOne'>{question.optionOne.text}</label>
                            <input value='optionOne' type='radio' id='optionOne'
                                   onClick={this.updateOption} name='answer'
                                   defaultChecked={optionOneAnswered}
                            />
                            <h4>OR</h4>
                            <label htmlFor='optionTwo'>{question.optionTwo.text}</label>
                            <input value='optionTwo' type='radio' id='optionTwo'
                                   onClick={this.updateOption}
                                   name='answer'
                                   defaultChecked={optionTwoAnswered}
                            />
                            <p/>
                            <button type='submit' disabled={this.state.chosenOption === ''}>Answer</button>
                        </form>
                    </div>
                )
        } else {
            return null
        }
    }
}

function mapStateToProps({authedUser, questions}, props) {
    const {id}  = props.match.params
    return {
        authedUser,
        question:questions[id]
    }
}

export default withRouter(connect(mapStateToProps)(QuestionVoting))