import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/pokecard.css"

const PokeCard = ({pokemon}) => {

    const [poke, setPoke] = useState()
    const navigate= useNavigate()

    useEffect(()=>{
        axios.get(pokemon.url)
            .then(res=>setPoke(res.data))
            .catch(err=>console.log(err))
    },[])


  const handleClick = () => {
    navigate(`/pokedex/${poke.id}`)
  }


  return (
    
    <article onClick={handleClick} className={`card__box border-${poke?.types[0].type.name}`}>
        <header className={`card__header bg-${poke?.types[0].type.name}`}>
            <img className='card__img' src={poke?.sprites.other["official-artwork"].front_default} alt="" />
        </header>
        <h2 className={`card__name color-${poke?.types[0].type.name}`}>{poke?.name} </h2>
        <ul className='card__container-types'>
            {
                poke?.types.map(type=>(
                    <li className='card__types' key={type.type.name}>{type.type .name}</li>
                ))
            }
            
        </ul>
        <hr className='card__hr' />
        <ul className='card__info'>
            {
                poke?.stats.map(stat=>(
                    <li className='card__info2' key={stat.stat.url}>
                        <span className='card__abilities'>{stat.stat.name}</span>
                        <span className={`card__span color-${poke?.types[0].type.name}`}>{stat.base_stat} </span>
                    </li>
                ))
            }
        </ul>   
    </article>
  )
}

export default PokeCard