import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
    state={
        optionOne: '',
        optionTwo: '',
    }
    handleSelection = (e)=>{
        this.setState({ [e.target.id]: e.target.value });
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        const { optionOne, optionTwo } = this.state
        const { dispatch } = this.props
        dispatch(handleAddQuestion(optionOne, optionTwo))
        console.log(optionOne, optionTwo)
        this.setState(()=>({
            optionOne,
            optionTwo,
        }))
        this.props.history.push('/')
    }
    render() {
        return (
            <div className='card d-flex justify-content-center'>
                <div className='cards align-self-center m-4'>
                <h3 className='card__title d-inline text-light'>Create a New question</h3>
				<h5 className='text-light'>Would you rather...</h5>
                <form onSubmit={this.handleSubmit} className='p-2'>
                    <div className='form-group'>
                        <label className='text-light'>Option One</label>
                        <input 
                        className='form-control options'
                        type='text'
                        id='optionOne'
                        onChange={this.handleSelection}
                        placeholder="Enter First Option " />
                    </div>
                    <div className='form-group'>
                        <label className='text-light'>Option Two</label>
                        <input 
                        className='form-control options'
                        type='text'
                        id='optionTwo'
                        onChange={(e)=> this.handleSelection(e)}
                        placeholder="Enter Second Option " />
                    </div>
                    <button className='btn-secondary rounded ' type="submit">Add Question</button>
                </form>
            </div>
            </div>
        )
    }
}

export default connect()(NewQuestion)
