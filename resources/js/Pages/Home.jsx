import App from '@/Layouts/App';
import { Link } from '@inertiajs/inertia-react';
import React from 'react';

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}

Home.layout = page => <App children={page} />;