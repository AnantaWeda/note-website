import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { IoLogoGoogle, IoLogoGithub } from "react-icons/io";
import { Label } from '@radix-ui/react-dropdown-menu';
import ErrorMessage from '@/Components/ErrorMessage';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <h1 className='mb-5 font-bold text-2xl text-center'>Login</h1>
            <p className='mb-6 text-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, incidunt?</p>
            <form onSubmit={submit}>
                <div className='mt-3'>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter Email..." value={data.email} onChange={e => setData('email',e.target.value)}/>
                    <ErrorMessage message={errors.email} className="ms-1"/>
                </div>
                <div className='mt-3'>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="Enter Password..." value={data.password} type="password" onChange={e => setData('password',e.target.value)}/>
                    <ErrorMessage message={errors.password} className="ms-1"/>
                </div>
                <Link href={route('register')} className='text-xs ps-1'>Not Have Account ?</Link>
                <Button className="w-full mt-5">Sign In</Button>
            </form>
            <div className='relative pb-2 pt-6 flex items-center justify-center'>
                <div className='absolute border w-[160px] border-black'></div>
                <p className='bg-background2 text-xs z-10 px-2'>Or Sign in with</p>
            </div>
            <div className='grid grid-cols-2 gap-3 mt-4 mb-3'>
                <a href={route('login.google')}>
                    <Button variant="bordered" className="font-bold w-full"><IoLogoGoogle className='me-2 text-xl'/> Google</Button>
                </a>
                <a href={route('login.github')}>
                    <Button variant="bordered" className="font-bold w-full"><IoLogoGithub className='me-2 text-xl'/> Github</Button>
                </a>
            </div>
        </GuestLayout>
    );
}
