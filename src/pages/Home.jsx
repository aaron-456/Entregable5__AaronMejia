import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNameTrainer } from '../store/slices/trainerName.slice'


const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(setNameTrainer(e.target.name.value.trim()))
        e.target.name.value=""
        navigate("/pokedex")
    }


  return (
    <div className='pokedex'>
        <img className='pokedex__img' src="/images/pokedex-image.png" alt="" />
        <h2 className='pokedex__title'>¡Hi Trainer!</h2>
        <p  className='pokedex__text'>To start this pokedex, give me your name</p>
        <form className='pokedex__form' onSubmit={handleSubmit}>
            <input className='pokedex__input' id='name' type="text"  />
            <button className='pokedex__btn'>Start</button>
        </form>
        <img className='poxedex__gif' src="/images/6vw5.gif" alt="" />
    </div>
  )
}

export default Home