import React, {Component} from 'react'
import './Footer.css'

export class Footer extends Component {
    render() {
        return (
            <div className='footer'>
                <div className="container">
                    <div className="row pb-5">
                        <div className="col-4">
                            <h2 style={{fontFamily: 'Luckiest Guy, cursive'}}>Bukapalak</h2>
                        </div>
                        <div className="col-4">
                            <h4>Belanja Online Murah di Bukapalak</h4>
                            <p>Bukapalak merupakan situs belanja online terpercaya di Indonesia yang menjual beragam produk yang dibutuhkan seluruh masyarakat Indonesia. Seiring berkembangnya teknologi, semakin banyak aktivitas yang dilakukan secara digital, lebih mudah dan praktis, termasuk kegiatan pembelanjaan yang kini semakin marak dilakukan secara digital, baik melalui komputer, laptop yang bisa diakses kapan saja dan di mana saja.</p>
                        </div>
                        <div className="col-4">
                            <h4>Keunggulan Belanja Online di Bukapalak</h4>
                            <p>• Aman dan Terpercaya. Belanja online di Bukalapak tidak perlu khawatir tertipu dengan adanya jaminan 100% aman. Pembeli diberikan jaminan 100% uang kembali apabila produk yang sudah Anda bayar tidak kunjung tiba di tempat Anda. Tak jarang orang yang khawatir tertipu sehingga memilih untuk beli offline. Singkirkan segala keraguan belanja online dengan adanya jaminan uang aman 100% di Bukapalak. </p>
                        </div>
                    </div>
                    <hr className='color : black'/>
                    <div className="row">
                        <div className="footer-copyright col-12 text-center">
                            @Copyright 2019. Bukapalak
                        </div>
                    </div>
                </div>
            </div>
        
        )
    }
}

export default Footer 


