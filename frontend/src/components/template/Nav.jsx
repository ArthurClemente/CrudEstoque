import './Nav.css'
import React from 'react'

export default props => 
    <aside className="menu-area">
        <nav className="menu">
            <a href="#/">
                <i className="fa fa-home"></i> Início
            </a>
            <a href="#/itens">
                <i className="fa fa-list-alt"></i> Itens
            </a>
        </nav>
    </aside>
