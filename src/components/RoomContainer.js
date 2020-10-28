import React from 'react'
import RoomFilter from './RoomFilter'
import RoomList from './RoomList'
import {RoomConsumer} from '../context'
import Loading from './Loading'
function RoomContainer() {
    return (
        <RoomConsumer>
           {value => {
               const {loading, rooms,sortedRooms} = value
               if(loading){
                return <Loading />
               }
               return(
                <>
                <RoomFilter rooms={rooms}/>
                <RoomList rooms={sortedRooms}/> 
                </>
               )
           }}
        </RoomConsumer>
    )
}

export default RoomContainer
