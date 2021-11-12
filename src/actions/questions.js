import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { addQuestionToUser } from "./users";
import { showLoading, hideLoading } from "react-redux-loading";
export const GET_QUESTIONS = "GET_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";

export function getQuestions(questions){
    return {
        type: GET_QUESTIONS,
        questions
    }
}

export function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question
    }
}

export function addAnswer( authedUser, qid, answer){
    return {
        type: ADD_ANSWER,
        qid,
        authedUser,
        answer
    }
}

export function handleAddQuestion(optionOneText, optionTwoText){
    return (dispatch, getState) =>{
        const { authedUser } = getState();
        dispatch(showLoading());

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
        .then((question)=>{
        dispatch(addQuestion(question))
        dispatch(addQuestionToUser(question, authedUser))
         } 
        )
        .then(()=> dispatch(hideLoading()));
    }
}

export function handleAddAnswer(qid, answer){
    console.log(answer, qid)
    return (dispatch, getState)=>{
        const { authedUser } = getState();
        dispatch(showLoading());
        return saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
        .then(()=> dispatch(addAnswer(authedUser, qid, answer)))
        .then(()=> dispatch(hideLoading()))
    }
}