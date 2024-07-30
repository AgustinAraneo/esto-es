import { useState } from "react";
import { OptionsIcon } from "@/icons/OptionsIcon";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/popover";
import { EditIcon } from "@/icons/EditIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "./shadcn/drawer";
import { Button } from "./shadcn";
import Image from "next/image";
import Link from "next/link";

export interface Project {
    projectName: string;
    description: string;
    projectManager: string;
    assignedTo: string;
    status: string;
    createdAt: string;
}

export interface ProjectCardProps {
    project: Project;
    onDelete: (projectName: string) => void;
}

export const ProjectsCards: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDelete = () => {
        const projects = JSON.parse(localStorage.getItem("projects") || "[]");
        const updatedProjects = projects.filter((p: Project) => p.projectName !== project.projectName);
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
        onDelete(project.projectName);
        setIsDrawerOpen(false);
    };

    const getAvatarSrc = (assignedTo: string) => {
        const avatars: { [key: string]: string } = {
            "Lionel Messi": "/messi.webp",
            "Alejandro Garnacho": "/garnacho.webp",
            "Sergio Busquets": "/busquet.webp",
        };
        return avatars[assignedTo] || "/messi.webp";
    };

    return (
        <div className="border-b-[1px] border-bordes px-4 py-2 bg-white w-full">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h3 className="text-sub-titulos text-[14px] leading-4 font-[400]">{project.projectName}</h3>
                    <h6 className="text-[10px] text-gris-fecha/45 lowercase">Creation date: {project.createdAt}</h6>
                </div>
                <div>
                    <PopoverOptions setIsDrawerOpen={setIsDrawerOpen} project={project} />
                </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
                <Image width={24} height={24} src={getAvatarSrc(project.assignedTo)} alt="Avatar" className="w-6 h-6 rounded-full object-cover" />
                <h4 className="text-sub-titulos text-[12px] font-[400] leading-[22px]">{project.assignedTo}</h4>
            </div>

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="px-4 pb-2 pt-0">
                        <Button variant={'primary'} onClick={handleDelete}>Delete</Button>
                        <DrawerClose>
                            <Button variant="outline" className="w-full">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

const PopoverOptions: React.FC<{ setIsDrawerOpen: (open: boolean) => void; project: Project }> = ({ setIsDrawerOpen, project }) => {
    return (
        <Popover>
            <PopoverTrigger><OptionsIcon /></PopoverTrigger>
            <PopoverContent className="p-0 w-[181px] rounded-[4px] mt-[6px] mr-2 custom-popover-content">
                <div className="flex flex-col">
                    <Link href={{ pathname: '/edit', query: { projectName: project.projectName } }}>
                        <div className="flex items-center gap-2 border-b-[1px] border-bordes px-4 py-3">
                            <EditIcon />
                            <h4 className="text-gris-label text-[12px] leading-5">Edit</h4>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2 px-4 py-3" onClick={() => setIsDrawerOpen(true)}>
                        <DeleteIcon />
                        <h4 className="text-gris-label text-[12px] leading-5">Delete</h4>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
