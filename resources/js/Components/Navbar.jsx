import { Link, usePage } from '@inertiajs/inertia-react';
import React from 'react';

const NavLink = ({href, method= "get", children}) => (
    <Link href={href} method={method} className="text-gray-800 capitalize transition duration-100 hover:text-black">{children}</Link>
)


function Navbar(props) {
    const {auth} = usePage().props;
    return (
        <nav className="flex items-center justify-between h-20 px-12 bg-white border-b border-gray-100">
            <div className="flex items-center gap-x-4">
                <NavLink href={route('home')}>
                    Home
                </NavLink>
                <NavLink href={route('dashboard')}>
                    Dashboard
                </NavLink>
                
                <NavLink href={route('threads.index')}>
                    Threads
                </NavLink>
                <NavLink href={route('threads.create')}>
                    Create Thread
                </NavLink>

            </div>
            <div className="flex items-center gap-x-4">
                {auth.user ? (
                    <>
                        <NavLink href="#">
                            {auth.user.name}
                        </NavLink>
                        <NavLink href={route('logout')} method="POST">
                            Logout
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink href={route('login')}>
                            Login
                        </NavLink>
                        <NavLink href={route('register')}>
                            Register
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;