import { Suspense } from 'react';
import { EditProjectForm } from '@/components/ui/EditProjectForm';
import { GoBackButton } from '@/components/ui/GoBackButton';
import { Navbar } from '@/components/ui/Navbar';

export default function Edit() {
    return (
        <main className="min-h-screen bg-gris-fondo">
            <Navbar />
            <GoBackButton title="Edit project" />
            <Suspense fallback={
                <div className='text-center mt-10 flex justify-center flex-col gap-4 w-full'>
                    <div className="loader w-full mx-auto"></div>
                    <p>Loading project...</p>
                </div>
            }>
                <EditProjectForm />
            </Suspense>
        </main>
    );
}
