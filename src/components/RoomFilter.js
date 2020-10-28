import React from 'react'
import Title from './Title'
import {useContext} from 'react'
import {RoomContext} from '../context'

export default function RoomFilter({rooms}) {
    const context = useContext(RoomContext)
    let {handleChange, type, price, maxPrice, minPrice, minSize, maxSize, capacity,breakfast, pets} = context
    //get unique
    const getUnique = (items, value) =>{
        return [...new Set(items.map(item=> item[value]))]
    }
    //get types
    let types = getUnique(rooms,'type')
    types = ['all', ...types]
    types = types.map((type,index)=>{
        return <option key={index} value={type}>{type}</option>
    })
    //get people
    let people = getUnique(rooms,'capacity')
    //sort capacity array
   people = people.sort(function(a,b){
       return a-b
   })
    people = people.map((capacity,index)=>{
        return <option key={index} value={capacity}>{capacity}</option>
    })
    return (
        <section className="filter-container">
            <Title title='Search Rooms' />
            <form className="filter-form">
                <div className="form-group">
                    <label htmlFor="type">Room Type</label>
                    <select onChange={handleChange}  id="type" name="type" className="form-control" value={type}>
                        {types}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select onChange={handleChange}  id="capacity" name="capacity" className="form-control" value={capacity}>
                        {people}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Room price ${price}</label>
                    <input type="range" name="price" id="price" min={minPrice} max={maxPrice} value={price} className="form-control"
                    onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input type="number"
                        name="minSize"
                        id="minSize"
                        value={minSize}
                        onChange={handleChange}
                        className="size-input" />
                        <input type="number"
                        name="maxSize"
                        id="maxSize"
                        value={maxSize}
                        onChange={handleChange}
                        className="size-input" />
                    </div>
                </div>
                <div className="form-group">
                <div className="single-extra"> 
                    <input onChange={handleChange} type="checkbox" checked={breakfast} id="breakfast" name="breakfast"/>
                    <label htmlFor="breakfast">Breakfast</label>                    
                </div>
                <div className="single-extra"> 
                    <input onChange={handleChange} type="checkbox" checked={pets} id="pets" name="pets"/>
                    <label htmlFor="pets">Pets</label>                    
                </div>
                </div>
            </form>
        </section>
    )
}
