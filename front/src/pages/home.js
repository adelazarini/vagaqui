// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Bem-vindo ao VagaQui</h1>
            <Link to="/login">Fazer Login</Link>
        </div>
    );
};

export default Home;
