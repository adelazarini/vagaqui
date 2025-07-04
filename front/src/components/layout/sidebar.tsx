import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SidebarProps {
    tipoUsuario: 'Candidato' | 'Empresa' | 'Entrevistador' | 'Administrador';
}

const Sidebar: React.FC<SidebarProps> = ({ tipoUsuario }) => {
    const router = useRouter();

    const menuItems = {
        'Candidato': [
            { label: 'Vagas', href: '/candidato/vagas', icon: '💼' },
            { label: 'Candidaturas', href: '/candidato/candidaturas', icon: '📋' },
            { label: 'Entrevistas', href: '/candidato/entrevistas', icon: '📅' },
            { label: 'Perfil', href: '/candidato/perfil', icon: '👤' }
        ],
        'Empresa': [
            { label: 'Vagas', href: '/empresa/vagas', icon: '💼' },
            { label: 'Candidaturas', href: '/empresa/candidaturas', icon: '📋' },
            { label: 'Entrevistas', href: '/empresa/entrevistas', icon: '📅' },
            { label: 'Perfil', href: '/empresa/perfil', icon: '🏢' }
        ],
        'Entrevistador': [
            { label: 'Entrevistas', href: '/entrevistador/entrevistas', icon: '📅' },
            { label: 'Candidaturas', href: '/entrevistador/candidaturas', icon: '📋' },
            { label: 'Perfil', href: '/entrevistador/perfil', icon: '👥' }
        ],
        'Administrador': [
            { label: 'Usuários', href: '/admin/usuarios', icon: '👥' },
            { label: 'Empresas', href: '/admin/empresas', icon: '🏢' },
            { label: 'Vagas', href: '/admin/vagas', icon: '💼' },
            { label: 'Relatórios', href: '/admin/relatorios', icon: '📊' }
        ]
    };

    return (
        <div className="w-64 bg-white shadow-md">
            <div className="p-4 bg-blue-500 text-white font-bold">
                VagaQui
            </div>
            <nav className="p-4">
                {menuItems[tipoUsuario].map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`
                            flex items-center p-2 mb-2 rounded
                            ${router.pathname === item.href
                                ? 'bg-blue-100 text-blue-600'
                                : 'hover:bg-gray-100'}
                        `}
                    >
                        <span className="mr-2">{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
