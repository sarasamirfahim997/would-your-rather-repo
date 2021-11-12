import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, Redirect } from "react-router-dom";
import { handleAddAnswer } from '../actions/questions'

class Question extends Component {
    state={
        selected: ''
    }
    handleSelect=(val)=>{
        this.setState(()=>({
            selected: val
        }))
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const { selected } = this.state
        const { dispatch, id } = this.props
        dispatch(handleAddAnswer(id, selected))
    }
    render() {
        const { authedUserInfo, question, author, id, viewed } = this.props
        if(!question){
			return <Redirect to='/notfound'/>;
        }
        return (
            <div className='container d-flex'>
                <div className='cards editedCards m-2 align-self-center'>
                <div className="col mb-2">
                        <img width='100' height='100' className=' rounded m-4' src={author.avatarURL} alt=''/>
                        <h4 className='card__title d-inline text-light'>{author.name} asks:</h4>
                        </div>
                    {/* {console.log(question)} */}
                    <div className='editedCardsP'>
                        {viewed ? (
                            <div>
                            <h4>Would you rather...</h4>
                            <p>
                                {question.optionOne.text} or {question.optionTwo.text}..?
                            </p>
                            </div>
                        ) : (
                            <div className='d-flex justify-content-between'>
                            <div>
                            <h4 className='d-inline'>Would you rather...   </h4>
                            <h6 className='d-inline'>
                                {question.optionOne.text} or {question.optionTwo.text} ?
                            </h6>
                            </div>
                            <Link className='mt-2 align-self-right d-block' to={`/questions/${id}`}>
                                <button className='btn-secondary rounded btn-lg'>
                                   {authedUserInfo.answers[question.id] ? 'View Poll' : 'Answer Poll'}
                                </button>
                            </Link>
                            </div>
                        )}
                       {authedUserInfo.answers[question.id] ? (
                            /* if answered and viewed (on View Poll) */
                           <div>
                               <h5 className='mt-2'>Choosed Answer: {question[authedUserInfo.answers[question.id]].text}</h5>
                               {viewed && (
                                   <div>
                                <h5>1- {question.optionOne.text}</h5>
                                <ul className="list-group">
                                    <li className='list-group-item bg-dark '>
                                        Votes: {question.optionOne.votes.length}
                                    </li>
                                    <li className='list-group-item bg-dark'>
                                        Percentage: {question.optionOne.votes.length === 0 ? 0 
                                        : (question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100}%
                                    </li>
                                </ul>
                                <h5>2- {question.optionTwo.text}</h5>
                                <ul className="list-group">
                                    <li className='list-group-item bg-dark'>
                                        Votes: {question.optionTwo.votes.length}
                                    </li>
                                    <li className='list-group-item bg-dark '>
                                        Percentage: {question.optionTwo.votes.length === 0 ? 0 
                                        : (question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100}%
                                    </li>
                                </ul>
                                </div>
                               )}
                           </div>
                       ) : (
                           /* if not answered and viewed (on Answer Poll) */
                           <div>
                           {viewed ? (
                            <form onSubmit={this.handleSubmit} className='d-flex justify-content-between'>
                                <div className='d-flex'>
                            <div className="form-check m-1">
                                 <input className="form-check-input" name='radioInput' type='radio' id='optionone' value='optionOne' onChange={(e) => this.handleSelect(e.target.value)} />
                                 <label className="form-check-label m-1" htmlFor='optionone'>{question.optionOne.text}</label>
                            </div>
                            <div className="form-check m-1">    
                                 <input className="form-check-input" name='radioInput' type='radio' id='optiontwo' value='optionTwo' onChange={(e) => this.handleSelect(e.target.value)} />
                                 <label className="form-check-label m-1" htmlFor='optiontwo'>{question.optionTwo.text}</label>
                            </div>
                            </div>
                            <button className='btn-secondary btn-lg rounded ' type='submit'>
                                Submit
                            </button>
                        </form>
                           ) : null}
                           
                       </div>
                       )}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, {id}){
    const question = questions[id]
    //console.log(users[question.author])
    const author = question ? users[question.author] : ''
    const authedUserInfo = users[authedUser]

    return{
        question,
        author,
        authedUserInfo
    }
}
export default withRouter(connect(mapStateToProps)(Question));