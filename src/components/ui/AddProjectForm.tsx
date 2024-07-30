'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Input,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Button,
} from './shadcn';
import { useRouter } from 'next/navigation';

const schema = z.object({
    projectName: z.string().min(1, { message: 'Enter a project name' }),
    description: z.string().min(1, { message: 'Enter a description' }),
    projectManager: z.string().min(1, { message: 'Select a project manager' }),
    assignedTo: z.string().min(1, { message: 'Select an assignee' }),
    status: z.string().min(1, { message: 'Select a status' }),
});

type FormData = z.infer<typeof schema> & { createdAt: string };

export const AddProjectForm: React.FC = () => {
    const router = useRouter();
    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            projectName: '',
            description: '',
            projectManager: '',
            assignedTo: '',
            status: '',
            createdAt: '',
        },
    });

    const onSubmit = (data: FormData) => {
        const currentDateTime = format(new Date(), 'MM/dd/yyyy hh:mm a');
        const projectWithDate = { ...data, createdAt: currentDateTime };

        const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]') as FormData[];
        const updatedProjects = [...existingProjects, projectWithDate];
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        form.reset();
        router.push('/');
    };

    return (
        <div className="px-4 mx-auto bg-white py-6 mt-4 lg:w-[665px] lg:rounded-[4px] lg:shadow-xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[16px]">
                    <FormField
                        control={form.control}
                        name="projectName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.projectName?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.description?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="projectManager"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project manager</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(value) => field.onChange(value)} value={field.value || ''}>
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
                                </FormControl>
                                <FormMessage>{form.formState.errors.projectManager?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="assignedTo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Assigned to</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(value) => field.onChange(value)} value={field.value || ''}>
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
                                </FormControl>
                                <FormMessage>{form.formState.errors.assignedTo?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(value) => field.onChange(value)} value={field.value || ''}>
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
                                </FormControl>
                                <FormMessage>{form.formState.errors.status?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" variant={'primary'} className='w-fit text-[16px] leading-6 mt-2'>Create project</Button>
                </form>
            </Form>
        </div>
    );
};
