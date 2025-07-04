import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login_index';
import Home from './pages/home/home_index';
import DashboardCandidato from './pages/candidato/candidato_index';
import DashboardEntrevistador from './pages/entrevistador/entrevistador_index';
import Register from './pages/register/register_index';
import DashboardEmpresa from './pages/empresa/empresa_index';
import ListarMensagens from './pages/mensagem/listar_mensagens_index';

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/candidato/dashboard" element={<DashboardCandidato />} />
            <Route path="/entrevistador/dashboard" element={<DashboardEntrevistador />} />
            <Route path="/register" element={<Register />} />
            <Route path="/empresa/dashboard" element={<DashboardEmpresa />} />
            <Route path="/mensagem/listar" element={<ListarMensagens />} />
        </Routes>
    </Router>
);

export default AppRoutes;
