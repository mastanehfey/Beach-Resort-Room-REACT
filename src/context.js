import React, { Component } from 'react'
import Client from './Contentful'
const RoomContext = React.createContext()
class RoomProvider extends Component {
    constructor(){
        super()
        this.state={
            rooms:[],
            featuredRooms:[],
            sortedRooms:[],
            loading: true,
            type:'all',
            price:0,
            capacity:0,
            minPrice:0,
            maxPrice:0,
            minSize:0,
            maxSize:0,
            breakfast:false,
            pets:false
        }

        this.getRoom = this.getRoom.bind(this)
    }
    //getData
getData = async()=>{
    try{
        let response = await Client.getEntries({
            content_type : 'beachResortRoom',
            order: '-fields.price'
        })
        let rooms = this.formatData(response.items);
        let featuredRooms = rooms.filter(room => room.featured === true)

        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));
        this.setState({
            rooms,
            featuredRooms,
            sortedRooms:rooms,
            loading:false,
            maxPrice,
            price: maxPrice,
            maxSize
        })
    }catch(error){
        console.log(error);
    }
}

    componentDidMount(){
    this.getData()
    }

    formatData(items){
        let tempRooms = items.map(item=>{
            let id = item.sys.id;
            let images = item.fields.images.map(img=>
                 {return img.fields.file.url}
            )
            let rooms = {...item.fields, id, images}
            return rooms
        })
        return tempRooms
    }
    getRoom(slug){
        let tempRooms = [...this.state.rooms]
        let room = tempRooms.find(room => room.slug === slug)
        return room
    }
    handleChange = event =>{
        const target = event.target
        const type = target.type
        const name = target.name
        const value = type === 'checkbox' ? target.checked : target.value
        this.setState({
            [name] :value,
        }, this.filterRooms)
    }
    filterRooms=()=>{
        let {type,
        price,
        capacity,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets,
    rooms} = this.state

    capacity = parseInt(capacity)
    price = parseInt(price)
    minSize = parseInt(minSize)
    maxSize = parseInt(maxSize)
            //all rooms
    let tempRooms = [...rooms];
    //filter by type
    if(type !== 'all'){
        tempRooms = tempRooms.filter(room => room.type === type)
    }

    //filter by capacity
    if(capacity !== 1){
        tempRooms = tempRooms.filter(room => room.capacity >= capacity)
    }
    //filter price
        tempRooms = tempRooms.filter(room => room.price<= price)

    //filter by size
        tempRooms = tempRooms.filter(room => room.size>=minSize && room.size<= maxSize)
    //filter by pets
    if(pets){
        tempRooms = tempRooms.filter(room => room.pets === true)
    }
    //filter by breakfast
    if(breakfast){
        tempRooms = tempRooms.filter(room => room.breakfast === true)
    }
    // tempRooms = tempRooms.filter(room => room.breakfast === breakfast)
    this.setState({
        sortedRooms: tempRooms
    })
    }
    render() {
        return (
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange:this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}
const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomContext, RoomConsumer}
