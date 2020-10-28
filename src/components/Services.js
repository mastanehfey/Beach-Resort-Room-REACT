import React, { Component } from 'react'
import Title from './Title'
import {FaHiking , FaCocktail, FaShuttleVan, FaBeer} from 'react-icons/fa'

export default class Services extends Component {
    state={
        services:[
        {icon: <FaCocktail />,
        title: 'Free Cocktail',
        info:'Your secure phrase from the registration process is included here, so that you can confirm that this email is from my ehealthTM.'
        },
        {icon: <FaHiking />,
            title: 'Extraordinary Hiking',
        info:'Your secure phrase from the registration process is included here, so that you can confirm that this email is from my ehealthTM.'
        },
        {   
        icon: <FaShuttleVan />,
        title: 'Free Shuttle Van',
        info:'Your secure phrase from the registration process is included here, so that you can confirm that this email is from my ehealthTM.'
        },
        {   
        icon: <FaBeer />,
        title: 'Strongest Beer',
        info:'Your secure phrase from the registration process is included here, so that you can confirm that this email is from my ehealthTM.'
        }
    ]
    }

    render() {
        return (
            <section className="services">
                <Title title={'Services'} />
                <div className="services-center">
                {this.state.services.map((item,index)=>{
                    return(
                        <article key={index} className="service">
                            <span>{item.icon}</span>
                        <h6>{item.title}</h6>
                        <p>{item.info}</p>
                    </article>
                    )
                })}
                </div>
            </section>
        )
    }
}
