import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PokeCard from '../components/Pokedex/PokeCard'
import TypesSelect from '../components/Pokedex/TypesSelect'
import "../components/styles/pokedex.css"

const Pokedex = () => {

const {nameTrainer} = useSelector(state=>state)

    const [pokemons, setPokemons] = useState()
    const [selectValue, setSelectValue] = useState("allpokemons")

    console.log(selectValue);


    useEffect(()=>{
        if(selectValue==="allpokemons"){

            const url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
            axios.get(url)
                .then(res => setPokemons(res.data))
                .catch(err=>console.log(err))
        }else {
            axios.get(selectValue)
                .then(res =>{
                    const results = res.data.pokemon.map(e=>e.pokemon)
                    setPokemons({results})})
                .catch(err => console.log(err))
        }
        
            
    },[selectValue])

    const navigate = useNavigate()


    const handleSubmit = e => {
        e.preventDefault()
    const inputValue = e.target.pokemon.value.trim().toLowerCase()   
        navigate(`/pokedex/${inputValue}`)
        e.target.pokemon.value= ""
  }


 
  return (
    <div>
        <header className='soso' >
            <img className='pokedex__logo' src="/images/pokedex-image.png" alt="" />

            <div className='pokedex__bannerchild'></div>
            <div className='pokedex__bannerchild2'></div>
            <div className='pokedex__container-bold'>
            <div className='pokedex__container-child'></div>
            </div>
            
        </header>
        <div className='pokedex__introduc'>
        <h1 className='pokedex__textuser' ><span className='pokedex__nameuser'>Hi {nameTrainer} ,</span> here find you favorite pokemon</h1>
        </div>
        <div className='pokedex__submit2'>
            <form onSubmit={handleSubmit}>
                <input className='pokedex__input2' id='pokemon' type="text" />
                <button className='pokedex__btn2'>Serch</button>
            </form>
            <TypesSelect setSelectValue={setSelectValue} />
        </div>
        
        <div className='pokedex__container'>
            {
                pokemons?.results.map(pokemon=>(
                    <PokeCard
                    key={pokemon.url}
                    pokemon={pokemon} />
                ))
            }
        </div>
    </div>
  )
}

export default Pokedex