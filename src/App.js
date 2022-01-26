import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Layout, Typography, Space } from 'antd'
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
                <Layout>
                    <div className="routes">
                        <Routes>
                            <Route exact path="/" element={<Homepage />} />
                            <Route exact path="/exchanges" element={<Exchanges />} />
                            <Route exact path="/currencies" element={<Currencies />} />
                            <Route exact path="/crypto/:coinid" element={<Details />} />
                            <Route exact path="/news" element={<News />} />
                        </Routes>
                    </div>
                </Layout>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    )
}

export default App;