import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {RoomContext} from '../context'
import StyledHero from '../components/StyledHero'
import Banner from '../components/Banner'
import defaultBcg from '../images/room-1.jpeg'

export default class SingleRoom extends Component {
    constructor(props){
        super(props)
        this.state={
            slug: this.props.match.params.slug,
            defaultBcg
        }
    }

    static contextType = RoomContext
    render() {
        const clickedRoom = this.context
        var room = clickedRoom.getRoom(this.state.slug)
        if(!room){
            return(
                <div className="error">
                    <h3>No such room found</h3>
                    <Link to="/rooms" className="btn-primary">
                        return to rooms
                    </Link>
                </div>
            )
        }
        let {name, breakfast, capacity,description, images, size,price,extras,pets} = room
        const [mainImg , ...defaultImg]  =images
        return (
            <>
            <StyledHero img={mainImg}>
                <Banner title={name} >
                    <Link to="/rooms" className="btn-primary">return to rooms</Link>
                </Banner>
            </StyledHero>
            <section className="single-room">
                <div className="single-room-images">
                    {defaultImg.map((img, index)=>{
                        return <img src={img} key={index} alt={name} />
                    })}
                </div>
                <div className="single-room-info">
                    <article className="desc">
                        <h3>details</h3>
                        <p>{description}</p>
                    </article>
                    <article className="info">
                        <h3>info</h3>
                        <h6>Price: ${price}</h6>
                        <h6>Size: {size} SQFT</h6>
                <h6>Max Capacity: {capacity} {capacity > 1 ? 'People' : 'Person'}</h6>
                <h6>{pets ? 'Pets allowed' : 'No pets allowed'}</h6>
                <h6>{breakfast ? 'free Breakfast included' : null}</h6>
                    </article>
                </div>
            </section>
            <section className="room-extras">
                <h6>extras</h6>
                <ul className="extras">
                    {extras.map((item, index)=>{
                        return <li key={index}>- {item}</li>
                    })}
                </ul>
            </section>
            </>
        )
    }
}