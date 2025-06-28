import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login_index';
import Home from './pages/home/home_index';

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            {/* Adicionar rotas para cada tipo de usuário */}
        </Routes>
    </Router>
);

export default AppRoutes;
