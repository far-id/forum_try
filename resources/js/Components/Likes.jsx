import { Link, usePage } from '@inertiajs/inertia-react';
import React from 'react';

export default function Likes({model, id, likes_count}) {
    const { auth } = usePage().props;
    return (
        <>
            {auth.user ? (
                <>
                    <Link className='mr-1' href={route('likes')} data={{ model, id }} method="post" as="button" preserveScroll>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </Link>
                    {likes_count}
                </>
            ): (
                <>
                    <span className='mr-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </span>
                    {likes_count}
                </>
            )}
        </>
    );
}
