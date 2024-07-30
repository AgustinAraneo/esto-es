export const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-black/90 text-white rounded shadow-2xl text-left my-4 mx-4 lg:mx-0">
            <h1 className="text-2xl font-bold mb-4 text-center">Introducción al Proyecto</h1>
            <h2 className="text-xl font-semibold mb-4">Funcionalidades Principales 🌟</h2>
            <ul className="list-disc mb-4 pl-5">
                <li><strong>Listar Proyectos:</strong> Los usuarios pueden ver una lista de todos los proyectos, con funcionalidades de búsqueda, paginado y eliminación.</li>
                <li><strong>Crear Proyectos:</strong> Implementación de un formulario para que los usuarios puedan añadir nuevos proyectos.</li>
                <li><strong>Eliminar Proyectos:</strong> Funcionalidad para eliminar proyectos con una confirmación modal para evitar eliminaciones accidentales.</li>
                <li><strong>Editar Proyectos:</strong> Los usuarios pueden actualizar la información de los proyectos existentes mediante un formulario de edición.</li>
                <li><strong>Buscar Proyectos:</strong> Inclusión de un campo de búsqueda para filtrar proyectos por nombre.</li>
                <li><strong>Paginado:</strong> Implementación de paginado en la lista de proyectos para manejar grandes cantidades de datos de manera eficiente.</li>
                <li><strong>Responsive:</strong> El gestor de proyectos es completamente responsive, accesible desde dispositivos móviles y de escritorio.</li>
            </ul>
            <h2 className="text-xl font-semibold mb-4">Tecnologías Utilizadas 💻</h2>
            <ul className="list-disc mb-4 pl-5">
                <li><strong>Next.js 14:</strong> Utilizado por su capacidad para realizar Client-Side Rendering (CSR), proporcionando una experiencia dinámica y optimizada para ciertos componentes.</li>
                <li><strong>TypeScript:</strong> Empleado para tipado estático y robustez en el desarrollo.</li>
                <li><strong>Tailwind CSS:</strong> Elegido por su enfoque utilitario y su capacidad para acelerar el desarrollo con estilos predefinidos.</li>
                <li><strong>Shadcn:</strong> Usado para el estilado y la creación de componentes personalizados.</li>
                <li><strong>Zod:</strong> Implementado para la validación de formularios, asegurando que todos los datos ingresados sean correctos.</li>
                <li><strong>Storage del Navegador:</strong> Los datos de los proyectos se almacenan en el almacenamiento del navegador para persistencia, incluso si el navegador se cierra.</li>
            </ul>
            <h2 className="text-xl font-semibold mb-4">Dependencias y Configuración 📖</h2>
            <p className="mb-4">Para ejecutar este proyecto, sigue estos pasos:</p>
            <pre className="bg-gray-600 p-4 rounded mb-4">
                $ yarn install
            </pre>
            <p className="mb-4">Despliegue 🚀</p>
            <pre className="bg-gray-600 p-4 rounded mb-4">
                $ yarn dev
            </pre>
            <p className="mb-4">Accede a la aplicación en: <a href="http://localhost:3000" className="text-blue-500 hover:underline">http://localhost:3000</a></p>
            <h2 className="text-xl font-semibold mb-4">Autor 😎</h2>
            <p className="mb-4">Desarrollado por: @AgustinAraneo</p>
            <div className="w-full flex justify-center">
                <button
                    onClick={onStart}
                    className="w-[60%] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Comenzar
                </button>
            </div>
        </div>
    </div>
);
