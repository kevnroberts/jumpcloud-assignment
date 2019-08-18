import React from 'react';
import SystemUsers from './containers/SystemUsers';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title"><span className="strong">Jump</span><span className="weak">Cloud</span> Assignment</h1>
            </header>
            <section className="App-body">
                <SystemUsers />
            </section>
        </div>
    );
}

export default App;
