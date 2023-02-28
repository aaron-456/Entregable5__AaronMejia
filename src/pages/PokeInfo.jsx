import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../../src/components/styles/pokedexinfo.css"

const PokeInfo = () => {

    const {id} = useParams()
    const [poke, setPoke] = useState()
    const [hasError, setHasError] = useState(false)

    useEffect(()=>{
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        axios.get(url)
            .then(res=>{
              setPoke(res.data)
              setHasError(false)
            })

            .catch(err=>{
              setHasError(true)
              console.log(err)
            })

    },[])

    if (hasError) {
      return <h2 className='text__err'>💢The with pokemon name "{id} not found"💢</h2>
    
    } else {
      return (
        <div className='pokeinfo__container'>
          <header className='soso' >
                <img className='pokedex__logo' src="/images/pokedex-image.png" alt="" />

                <div className='pokedex__bannerchild'></div>
                <div className='pokedex__bannerchild2'></div>
                <div className='pokedex__container-bold'>
                <div className='pokedex__container-child'></div>
                </div>
          </header>
          <div className='pokeinfo__contsecond'>
            <header className={`card__header bg-${poke?.types[0].type.name}`}>
              <img className='pokeinfo__img' src={poke?.sprites.other['official-artwork'].front_default
              } alt="" />
            </header>
          
            <h2 className='pokeinfo__id'>#{poke?.id} </h2>
            <h2  className='pokeinfo__name'>{poke?.name}</h2>
            <div className='pokeinfo__weigthandheigth'>
              <h3 className='pokeinfo__weight'>Weight<p className='pokeinfo__number'> {poke?.weight}</p></h3>
              <h3 className='pokeinfo__height'>Height<p className='pokeinfo__number'>{poke?.height}</p></h3>
            </div>

            <div className='pokeinfo__typeofskills'>
                <ul className='pokeinfo__1'>Types
                {
                    poke?.types.map(type=>(
                        <li className='pokeinfo__li' key={type.type.name}>{type.type .name}</li>
                    ))
                }
                </ul>

                <ul className='pokeinfo__1'>Skills
                {
                    poke?.abilities.map(ability=>(
                        <li className='pokeinfo__li' key={ability.ability.name}>{ability.ability .name}</li>
                    ))
                }
                </ul>
            </div>

            

            <ul className='pokeinfo__stats'>Stats <hr />
            {
                poke?.stats.map(stat=>(
                    <li className='pokeinfo__statschild' key={stat.stat.url}>
                        <span className='pokeinfo__span'>{stat.stat.name}</span>
                        <span className={`pokeinfo__span color-${poke?.types[0].type.name}`}>{stat.base_stat} </span>
                    </li>
                ))
            }
            </ul>
          </div>
          <div className='tuta'>
              <h2 className='namemove'>Movements</h2>
              <ul className='pokeinfo__movements'>
              
                  {
                    poke?.moves.map(move=>(
                      <li>
                        <span className='text__move'>{move.move.name} </span>
                      </li>
                    ))
                  }
                </ul>
          </div>
          
        </div>
      )
    }

 
}

export default PokeInfo