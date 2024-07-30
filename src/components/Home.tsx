'use client';
import React, { useEffect, useState } from 'react';
import { Navbar } from './ui/Navbar';
import { AddProyectButton } from './ui/AddProjectButton';
import { type Project, ProjectsCards } from './ui/ProjectsCards';

export const Main: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]') as Project[];
        setProjects(storedProjects);
        setLoading(false);  // Cambiar el estado de loading a false después de obtener los proyectos
    }, []);

    const handleDelete = (projectName: string) => {
        const updatedProjects = projects.filter(project => project.projectName !== projectName);
        setProjects(updatedProjects);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
    };

    return (
        <div className='bg-gris-fondo min-h-screen'>
            <Navbar />
            <AddProyectButton />
            <div className='mt-4'>
                {loading ? (
                    <p>Buscando proyectos...</p>  // Mostrar mensaje de cargando mientras se buscan los proyectos
                ) : (
                    projects.length > 0 ? (
                        projects.map((project, index) => (
                            <ProjectsCards key={index} project={project} onDelete={handleDelete} />
                        ))
                    ) : (
                        <p>No projects found.</p>
                    )
                )}
            </div>
        </div>
    );
};
