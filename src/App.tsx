import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import {
    Navbar,
    Footer,
    Homepage,
    Exchanges,
    Currencies,
    Details,
    News,   
} from './components'
import './App.css'


const App = () => {
    return (
        <div className="app">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="main">
                <Layout className="main-contant">
                    <div className="routes">
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/exchanges" element={<Exchanges />} />
                            <Route path="/currencies" element={<Currencies />} />
                            <Route path="/crypto/:coinid" element={<Details />} />
                            <Route path="/news" element={<News />} />
                        </Routes>
                    </div>
                </Layout>
                <Footer />
            </div>
        </div>
    )
}

export default App;