import { GET_USERS, ADD_QUESTION_TO_USER } from '../actions/users'
import { ADD_ANSWER } from '../actions/questions'

export default function users(state={}, action){
    switch (action.type){
        case GET_USERS:
            return{
                ...state,
                ...action.users
            }
        case ADD_ANSWER:
            return{
                ...state,
                [action.authedUser]:{
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            }
        case ADD_QUESTION_TO_USER:
            return{
                ...state,
                [action.author]:{
                    ...state[action.author],
                    questions: state[action.author].questions.concat([action.question.id])
                }
            }
        default: 
        return state
    }
}