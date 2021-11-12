import { GET_USERS } from '../actions/users'
import { ADD_ANSWER } from '../actions/questions'

export default function users(state={}, action){
    switch (action.type){
        case GET_USERS:
            return{
                ...state,
                ...action.users
            }
        case ADD_ANSWER:
            console.log(action)
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
        default: 
        return state
    }
}