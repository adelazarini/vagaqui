import React, { ReactNode } from 'react';
import TopBar from './top_bar';
import Footer from './footer';

interface DashboardLayoutProps {
    children: ReactNode;
    tipoUsuario: 'Candidato' | 'Empresa' | 'Entrevistador' | 'Administrador';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    tipoUsuario
}) => {
    return (
        <div className="dashboard-layout">
            <TopBar tipoUsuario={tipoUsuario} />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default DashboardLayout;
