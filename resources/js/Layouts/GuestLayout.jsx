import ApplicationLogo from '@/Components/ApplicationLogo';
import { ModeToggle } from '@/Components/ModeToggle';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
            <ModeToggle className="w-14 h-14 rounded-full ms-5"/>
            <div className="w-full sm:max-w-md mt-6 px-9 py-6 bg-background2 shadow-md overflow-hidden rounded-3xl">
                {children}
            </div>
        </div>
    );
}
