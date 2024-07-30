'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { Input, Button, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './shadcn';
import { Project } from './ProjectsCards';

// Define the schema with Zod
const projectSchema = z.object({
    projectName: z.string().min(1, { message: "Project name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    projectManager: z.string().min(1, { message: "Project manager is required" }),
    assignedTo: z.string().min(1, { message: "Assignee is required" }),
    status: z.string().min(1, { message: "Status is required" })
});

export const EditProjectForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectName = searchParams.get('projectName');
    const [project, setProject] = useState<Project | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        const selectedProject = projects.find((p: Project) => p.projectName === projectName);
        if (selectedProject) {
            setProject(selectedProject);
        }
    }, [projectName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProject(prevState => prevState ? { ...prevState, [name]: value } : null);
    };

    const handleSelectChange = (name: string, value: string) => {
        setProject(prevState => prevState ? { ...prevState, [name]: value } : null);
    };

    const handleSave = () => {
        if (project) {
            try {
                projectSchema.parse(project);
                const projects = JSON.parse(localStorage.getItem('projects') || '[]');
                const updatedProjects = projects.map((p: Project) => p.projectName === project.projectName ? project : p);
                localStorage.setItem('projects', JSON.stringify(updatedProjects));
                router.push('/');
            } catch (e) {
                if (e instanceof z.ZodError) {
                    const errorMessages = e.errors.reduce((acc, curr) => {
                        acc[curr.path[0]] = curr.message;
                        return acc;
                    }, {} as Record<string, string>);
                    setErrors(errorMessages);
                }
            }
        }
    };

    if (!project) return <div>Loading...</div>;

    return (
        <div className="px-4 mx-auto bg-white py-6 mt-4">
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="flex flex-col gap-[16px]">
                <div className="form-item">
                    <label className="form-label">Project name</label>
                    <div className="form-control">
                        <Input
                            name="projectName"
                            value={project.projectName}
                            onChange={handleChange}
                            placeholder="Project Name"
                        />
                        {errors.projectName && <p className="text-red-500">{errors.projectName}</p>}
                    </div>
                </div>
                <div className="form-item">
                    <label className="form-label">Description</label>
                    <div className="form-control">
                        <Input
                            name="description"
                            value={project.description}
                            onChange={handleChange}
                            placeholder="Description"
                        />
                        {errors.description && <p className="text-red-500">{errors.description}</p>}
                    </div>
                </div>
                <div className="form-item">
                    <label className="form-label">Project Manager</label>
                    <div className="form-control">
                        <Select
                            onValueChange={(value) => handleSelectChange('projectManager', value)}
                            value={project.projectManager || ''}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Project Manager" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="John Doe">John Doe</SelectItem>
                                    <SelectItem value="Lionel Scaloni">Lionel Scaloni</SelectItem>
                                    <SelectItem value="Pep Guardiola">Pep Guardiola</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.projectManager && <p className="text-red-500">{errors.projectManager}</p>}
                    </div>
                </div>
                <div className="form-item">
                    <label className="form-label">Assigned to</label>
                    <div className="form-control">
                        <Select
                            onValueChange={(value) => handleSelectChange('assignedTo', value)}
                            value={project.assignedTo || ''}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Assignee" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Alejandro Garnacho">Alejandro Garnacho</SelectItem>
                                    <SelectItem value="Lionel Messi">Lionel Messi</SelectItem>
                                    <SelectItem value="Sergio Busquets">Sergio Busquets</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.assignedTo && <p className="text-red-500">{errors.assignedTo}</p>}
                    </div>
                </div>
                <div className="form-item">
                    <label className="form-label">Status</label>
                    <div className="form-control">
                        <Select
                            onValueChange={(value) => handleSelectChange('status', value)}
                            value={project.status || ''}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.status && <p className="text-red-500">{errors.status}</p>}
                    </div>
                </div>
                <Button type="submit" variant={'primary'} className='w-fit text-[16px] leading-6'>Save</Button>
            </form>
        </div>
    );
};
