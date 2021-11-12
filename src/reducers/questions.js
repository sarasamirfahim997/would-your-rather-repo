import { GET_QUESTIONS, ADD_QUESTION, ADD_ANSWER } from '../actions/questions'

export default function questions(state={}, action){
    switch (action.type){
        case GET_QUESTIONS:
            return{
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return{
                ...state,
                [action.question.id]: action.question
            }
        case ADD_ANSWER:
            console.log(action)
            console.log(state)
            
            return{
                ...state,
                [action.qid]:{
                    ...state[action.qid],
                    [action.answer]:{
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            }
        default:
            console.log(state)
            return state
    }
}