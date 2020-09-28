import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import ItensCrud from '../components/itens/ItensCrud'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/itens' component={ItensCrud} />
        <Redirect from='*' to='/' />
    </Switch>