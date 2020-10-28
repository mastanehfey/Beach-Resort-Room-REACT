import React from 'react'
import {Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import Services from '../components/Services'
import FeaturedRooms from '../components/FeaturedRooms'

const Home = () => {
    return (
        <>
        <Hero>
            <Banner title={'Luxurious rooms'} subtitle={'deluxe rooms starting at $299'}>
                <Link to="/" className="btn-primary">return home</Link>
            </Banner>
        </Hero>
        <Services />
        <FeaturedRooms />
        </>
    )
}
export default Home;
