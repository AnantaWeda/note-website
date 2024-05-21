import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { IoLogoGithub, IoLogoGoogle } from 'react-icons/io';
import { Input } from '@/Components/ui/input';
import ErrorMessage from '@/Components/ErrorMessage';
import { Label } from '@/Components/ui/label';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <h1 className='mb-5 font-bold text-2xl text-center'>Register</h1>
            <p className='mb-3 text-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, incidunt?</p>
            <form onSubmit={submit}> 
                <div className='mt-3'>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter Email..." value={data.email} onChange={e => setData('email',e.target.value)}/>
                    <ErrorMessage message={errors.email} className="ms-1"/>
                </div>
                <div className='mt-3'>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter Name..." value={data.name} onChange={e => setData('name',e.target.value)}/>
                    <ErrorMessage message={errors.name} className="ms-1"/>
                </div>
                <div className='mt-3'>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="Enter Password..." type="password" value={data.password} onChange={e => setData('password',e.target.value)}/>
                    <ErrorMessage message={errors.password} className="ms-1"/>
                </div>
                <div className='mt-3'>
                    <Label htmlFor="password_confirmation">Password Confirmation</Label>
                    <Input id="password_confirmation" placeholder="Enter Password..." type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation',e.target.value)}/>
                    <ErrorMessage message={errors.password_confirmation} className="ms-1"/>
                </div>
                <div className='mt-3'>
                    <Label htmlFor="profile">Profile</Label>
                    <Input id="profile" type="file" onChange={e => setData('profile',e.target.files[0])}/>
                    <ErrorMessage message={errors.profile} className="ms-1"/>
                </div>
                <Button className="w-full mt-5">Register</Button>
            </form>
            <Link href={route('register')} className='text-xs ps-1'>Already Registered ?</Link>
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
