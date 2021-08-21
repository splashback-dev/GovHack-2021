import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import {Home} from './pages/Home';
import {Header} from './components/Header';
import { About } from './pages/About';

function App() {
    return (
        <div className="w-full h-full relative">
            <div className="absolute inset-x-0 top-0 h-16">
                <Header />
            </div>
            <div className="h-full pt-16 w-full">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/about" component={About}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
