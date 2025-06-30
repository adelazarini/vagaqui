import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/auth_context';

import Login from './pages/login/login_index';
import Home from './pages/home/home_index';
import DashboardCandidato from './pages/candidato/candidato_index';
import DashboardEntrevistador from './pages/entrevistador/entrevistador_index';
import Register from './pages/register/register_index';
import DashboardEmpresa from './pages/empresa/empresa_index';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { usuario } = useAuth();

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(usuario.tipo_usuario)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

const AppRoutes: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route
                path="/candidato/dashboard"
                element={
                    <ProtectedRoute allowedRoles={['Candidato']}>
                        <DashboardCandidato />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/entrevistador/dashboard"
                element={
                    <ProtectedRoute allowedRoles={['Entrevistador']}>
                        <DashboardEntrevistador />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/empresa/dashboard"
                element={
                    <ProtectedRoute allowedRoles={['Empresa']}>
                        <DashboardEmpresa />
                    </ProtectedRoute>
                }
            />
            <Route path="/register" element={<Register />} />
        </Routes>
    </Router>
);

export default AppRoutes;
