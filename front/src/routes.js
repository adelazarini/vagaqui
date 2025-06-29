import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login_index';
import Home from './pages/home/home_index';
import DashboardCandidato from './pages/candidato/candidato_index';
import DashboardEntrevistador from './pages/entrevistador/entrevistador_index';

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/candidato/dashboard" element={<DashboardCandidato />} />
            <Route path="/entrevistador/dashboard" element={<DashboardEntrevistador />} />
            {/* Adicionar rotas para cada tipo de usuário */}
        </Routes>
    </Router>
);

export default AppRoutes;
