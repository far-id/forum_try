import { Link, usePage } from '@inertiajs/inertia-react';
import React from 'react';

export default function BestAnswer({thread, reply}) {
    const { auth } = usePage().props;
    return (
        <>
            {thread.answer_id == reply.id && (
                <div className="text-white bg-green-600">
                    Best
                </div>
            )}
            {auth.user ? auth.user.id == thread.user.id && (
                <Link href={route('answer', thread.slug)} method="post" as="button" data={{ answer_id: reply.id }} preserveScroll >Mark Best Answer</Link>
            ): ''}
        </>
    );
}
