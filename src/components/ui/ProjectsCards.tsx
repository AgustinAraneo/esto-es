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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger, DialogTitle, DialogFooter, DialogClose } from "./shadcn/dialog";

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
        <div>
            {/* Mobile View */}
            <div className="border-b-[1px] border-bordes px-4 py-2 bg-white w-full lg:hidden block">
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

            {/* Desktop View */}
            <div className="lg:block hidden  w-full px-[48px]">
                <table className="min-w-full bg-white shadow-xl rounded-b-[4px]">
                    <tbody>
                        <tr className="flex w-full">
                            <td className="flex-1 px-6 py-4 whitespace-no-wrap border-b-2 border-bordes w-full">
                                <div className=" line-clamp-1 text-[14px] leading-[22px] text-sub-titulos font-[500]">
                                    {project.projectName}
                                </div>
                                <div className=" line-clamp-1 text-[12px] leading-5 text-gris-fecha font-[500]">
                                    Creation date: {project.createdAt}
                                </div>
                            </td>
                            <td className="flex-1 px-6 py-4 whitespace-no-wrap border-b-2 border-bordes">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-orange-500">
                                            <span className="text-sm font-medium leading-none text-orange-200">
                                                {project.projectManager.charAt(0)}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="ml-4">
                                        <div className=" line-clamp-1 text-[14px] leading-[22px] text-sub-titulos font-[500]">
                                            {project.projectManager}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="flex-1 px-6 py-4 whitespace-no-wrap border-b-2 border-bordes">
                                <div className="flex items-center">
                                    <Image width={40} height={40} src={getAvatarSrc(project.assignedTo)} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                                    <div className="ml-4">
                                        <div className=" line-clamp-1 text-[14px] leading-[22px] text-sub-titulos font-[500]">
                                            {project.assignedTo}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="flex-1 px-6 py-4 whitespace-no-wrap border-b-2 border-bordes">
                                <span className="px-2 py-[2px] inline-flex text-xs leading-5 font-semibold rounded-[4px] border-[2px] border-bordes bg-gris-fondo text-sub-titulos line-clamp-1">
                                    {project.status}
                                </span>
                            </td>
                            <td className="flex-0 pr-8 py-4 whitespace-no-wrap border-b-2 border-bordes text-sm leading-5 font-medium">
                                <PopoverOptions setIsDrawerOpen={setIsDrawerOpen} handleDelete={handleDelete} project={project} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const PopoverOptions: React.FC<{ setIsDrawerOpen: (open: boolean) => void; handleDelete?: () => void; project: Project }> = ({ setIsDrawerOpen, handleDelete, project }) => {
    return (
        <Popover>
            <PopoverTrigger><OptionsIcon /></PopoverTrigger>
            <PopoverContent className="p-0 w-[181px] rounded-[4px] mt-[6px] lg:mt-2 mr-2 lg:mr-16 custom-popover-content">
                <div className="flex flex-col">
                    <Link href={{ pathname: '/edit', query: { projectName: project.projectName } }}>
                        <div className="flex items-center gap-2 border-b-[1px] border-bordes px-4 py-3">
                            <EditIcon />
                            <h4 className="text-gris-label text-[12px] leading-5">Edit</h4>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2 px-4 py-3 lg:hidden cursor-pointer" onClick={() => setIsDrawerOpen(true)}>
                        <DeleteIcon />
                        <h4 className="text-gris-label text-[12px] leading-5">Delete</h4>
                    </div>
                    <Dialog>
                        <DialogTrigger className="items-center gap-2 px-4 py-3 hidden lg:flex">
                            <DeleteIcon />
                            <h4 className="text-gris-label text-[12px] leading-5">Delete</h4>
                        </DialogTrigger>
                        <DialogContent className="w-[400px]">
                            <DialogHeader>
                                <DialogTitle className="text-center">Are you absolutely sure?</DialogTitle>
                                <DialogDescription className="text-center">This action cannot be undone.</DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="px-4 pb-2 pt-4">
                                <div className="flex items-center w-full gap-2">
                                    <DialogClose>
                                        <Button variant={'primary'} className="w-40" onClick={handleDelete}>Delete</Button>
                                    </DialogClose>
                                    <DialogClose>
                                        <Button variant="outline" className="w-40">Cancel</Button>
                                    </DialogClose>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </PopoverContent>
        </Popover>
    );
};


