'use client';
import React, { useEffect, useState } from 'react';
import { Navbar } from './ui/Navbar';
import { AddProyectButton } from './ui/AddProjectButton';
import { type Project, ProjectsCards } from './ui/ProjectsCards';
import { Input } from './ui/shadcn';
import { SearchIcon, ChevronLeft, ChevronRight, AlertOctagon, BookOpen } from 'lucide-react';
import { WelcomeScreen } from './Welcome';

export const Main: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showWelcome, setShowWelcome] = useState<boolean>(false);

    const projectsPerPage = 5;

    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]') as Project[];
        setProjects(storedProjects);
        setLoading(false);


        const welcomeShown = localStorage.getItem('welcomeShown');
        if (!welcomeShown) {
            setShowWelcome(true);
        }
    }, []);

    const handleDelete = (projectName: string) => {
        const updatedProjects = projects.filter(project => project.projectName !== projectName);
        setProjects(updatedProjects);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredProjects = projects.filter(project =>
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPageNumbersToShow = 5;
        const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

        let startPage = Math.max(1, currentPage - halfMaxPageNumbersToShow);
        let endPage = Math.min(totalPages, currentPage + halfMaxPageNumbersToShow);

        if (currentPage <= halfMaxPageNumbersToShow) {
            endPage = Math.min(totalPages, maxPageNumbersToShow);
        }

        if (currentPage + halfMaxPageNumbersToShow >= totalPages) {
            startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => paginate(i)}
                    className={`px-3 py-1 mx-1 rounded-full ${currentPage === i ? 'bg-gris-label text-white' : ''}`}
                >
                    {i}
                </button>
            );
        }

        if (startPage > 1) {
            pageNumbers.unshift(<span key="start-dots" className="px-3 py-1 mx-1">...</span>);
        }

        if (endPage < totalPages) {
            pageNumbers.push(<span key="end-dots" className="px-3 py-1 mx-1">...</span>);
        }

        return pageNumbers;
    };

    const handleStart = () => {
        setShowWelcome(false);
        localStorage.setItem('welcomeShown', 'true');
    };

    const handleResetWelcome = () => {
        setShowWelcome(true);
        localStorage.removeItem('welcomeShown');
    };

    return (
        <div className='bg-gris-fondo min-h-screen'>
            {showWelcome ? (
                <WelcomeScreen onStart={handleStart} />
            ) : (
                <>
                    <Navbar />
                    <AddProyectButton />
                    <div>
                        {loading ? (
                            <div className='text-center mt-10 flex justify-center flex-col gap-4 w-full'>
                                <div className="loader w-full mx-auto"></div>
                                <p>Searching projects...</p>
                            </div>
                        ) : (
                            filteredProjects.length > 0 ? (
                                <div>
                                    <div className='relative w-full max-w-md mx-auto lg:mx-0 lg:px-[48px] p-4'>
                                        <span className='absolute inset-y-0 right-0 flex items-center pr-6'>
                                            <SearchIcon className='w-5 h-5 text-gray-400' />
                                        </span>
                                        <Input
                                            type='text'
                                            placeholder='Search projects by name...'
                                            value={searchTerm}
                                            onChange={handleSearch}
                                            className='pl-10 p-2 border rounded w-full'
                                        />
                                    </div>
                                    <div className=' w-full mx-auto lg:block hidden'>
                                        <div className='border-b-2 border-bordes mx-[48px] bg-[#FAFAFA] py-5 rounded-t-[4px] '>
                                            <tr>
                                                <th className="w-[438px] text-[14px] leading-[22px] text-titulos px-6  text-left tracking-wider">Project info</th>
                                                <th className="w-[438px] text-[14px] leading-[22px] text-titulos px-10  text-left tracking-wider">Project Manager</th>
                                                <th className="w-[438px] text-[14px] leading-[22px] text-titulos px-12  text-left tracking-wider">Assigned to</th>
                                                <th className="w-[438px] text-[14px] leading-[22px] text-titulos pr-6 pl-14  text-left tracking-wider">Status</th>
                                                <th className=" px-6   text-left leading-4 text-gray-600 tracking-wider">Action</th>
                                            </tr>
                                        </div>
                                    </div>
                                    {currentProjects.map((project, index) => (
                                        <ProjectsCards key={index} project={project} onDelete={handleDelete} />
                                    ))}
                                    <div className='flex justify-center absolute bottom-12 lg:bottom-40 mx-auto w-full'>
                                        <button
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className='px-3 py-1 mx-1  disabled:opacity-50'
                                        >
                                            <ChevronLeft className='w-5 h-5' />
                                        </button>
                                        {renderPageNumbers()}
                                        <button
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className='px-3 py-1 mx-1   disabled:opacity-50'
                                        >
                                            <ChevronRight className='w-5 h-5' />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='text-center mt-10'>
                                    <AlertOctagon className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                                    <p>No projects found.</p>
                                </div>
                            )
                        )}
                    </div>
                    <button
                        onClick={handleResetWelcome}
                        className='absolute bottom-4 left-4 p-2 bg-white rounded-full shadow-xl border-2 border-blue-500'
                    >
                        <BookOpen className='w-6 h-6 text-blue-500' />
                    </button>
                </>
            )}
        </div>
    );
};
