import {_getUsers, _getQuestions} from '../utils/_DATA'
import {receiveQuestions} from './questions'
import {receiveUsers} from './users'
import {showLoading, hideLoading} from 'react-redux-loading'


export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        Promise.all([
            _getUsers(),
            _getQuestions()
        ]).then(
            ([users, questions]) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            }
        )
    }

}