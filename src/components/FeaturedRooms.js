import React, { Component } from 'react'
import {RoomContext} from '../context';
import Title from './Title'
import Loading from './Loading'
import Room from './Room'
export default class FeaturedRooms extends Component {
    static contextType = RoomContext;
  
    render() {
        let {featuredRooms:rooms, loading} = this.context;
        rooms = rooms.map(room =>{
            return <Room key={room.id} room={room}/>
        })
        return (
            <section className="featured-rooms">
                <Title title="Featured Room" />
                <div />
                <div className="featured-rooms-center">
                {loading ? <Loading /> : rooms}
                </div>
            </section>
        )
    }
}
