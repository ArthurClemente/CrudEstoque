import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props => 
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/itens">
                <i className="fa fa-list-alt"></i> Itens
            </Link>
        </nav>
    </aside>
