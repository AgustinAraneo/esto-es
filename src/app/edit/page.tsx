import { EditProjectForm } from "@/components/ui/EditProjectForm";
import { GoBackButton } from "@/components/ui/GoBackButton";
import { Navbar } from "@/components/ui/Navbar";

export default function Add() {
    return (
        <main className="min-h-screen bg-gris-fondo">
            <Navbar />
            <GoBackButton title="Edit project" />
            <EditProjectForm />
        </main>
    );
}
