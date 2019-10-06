import React, { Component } from 'react'
import './Home.css'
import Corausel from './Corausel'

export default class Home extends Component {
    render() {
        return (
            <div className='container mt-4'>
                <div className='text-center'style={{fontFamily: 'Luckiest Guy, cursive', fontSize:'60px', color: 'blue'}}>dimsSt🤣re</div>
                  <h1 className='text-center mt-5' style={{fontFamily: 'Luckiest Guy, cursive'}}>
                     <b>THE ONLINE TOY STORE WITH YOUR FAVORITE TOYS AND GAMES</b>
                  </h1>

                  <center>
                      <p>#itsplaytime</p>
                  </center>
                <div>
                    < Corausel/>
                </div>
            </div>
        )
    }
}
