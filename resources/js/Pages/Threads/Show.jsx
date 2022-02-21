import Likes from '@/Components/Likes';
import ProfilePicture from '@/Components/ProfilePicture';
import Reply from '@/Components/Reply';
import App from '@/Layouts/App';
import { Link, usePage } from '@inertiajs/inertia-react';
import React from 'react';

export default function Show({thread, replies}) {
    const { auth } = usePage().props;
    return (
        <div>
            <div className="flex px-6 py-6 bg-white rounded-lg shadow-md">
                <ProfilePicture src={thread.user.picture} alt={thread.user.name} />
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <span className="font-semibold text-blue-700">{thread.user.name}</span>
                            <span>|</span>
                            <span className="text-sm text-gray-500">Posted {thread.created_at}</span>
                            <Link href={`threads?category=${thread.category.slug}`} className="px-2 py-1 ml-1 text-sm text-white bg-blue-600 rounded-xl">
                                {thread.category.name}
                            </Link>
                        </div>
                        {auth.user && auth.user.id === thread.user.id && (
                            <div className="flex items-center justify-end gap-x-2">
                                <Link href={route('threads.edit', thread.slug)} className="px-2 py-1 text-gray-800 transition-colors duration-100 border hover:bg-green-400/70 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                                <Link href={route('threads.destroy', thread.slug)} method="delete" as="button" className="px-2 py-1 text-gray-800 transition-colors duration-100 border hover:bg-red-400/70 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="text-xl font-semibold text-gray-900">
                        {thread.title}
                    </div>
                    <div>
                        {thread.body}
                    </div>
                    <div className="flex items-center justify-end gap-x-3">
                        <div className="flex items-center">
                            <Likes model="thread" id={thread.id} likes_count={thread.likes_count} />
                        </div>
                        <div className="flex items-center">
                            <Link href={route('threads.show', thread.slug)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            {thread.replies_count}
                        </div>
                    </div>
                </div>
            </div>
            <Reply auth={auth} thread={thread} replies={replies} />

            {/* <img className='rounded-full w-9 h-9' src={thread.user.picture} alt={thread.user.name} />
            <h1 className='mb-4 text-xl'>{thread.title}</h1>
            <div className='mb-4'>
                
                <p>{thread.body}</p>
            </div>

            <Likes model="thread" id={thread.id} likes_count={thread.likes_count} />
            { auth.user ? auth.user.id == thread.user.id && (
                <div className='flex gap-x-3'>
                    <Link href={route('threads.destroy', thread.slug)} method="delete" as="button" className="px-5 py-3 text-white bg-pink-600 rounded-lg">
                        Delete
                    </Link>
                    <Link href={route('threads.edit', thread.slug)} as="button" className="px-5 py-3 text-white bg-green-600 rounded-lg">
                        Edit
                    </Link>
                </div>
            ) : ''}

            <Reply auth={auth} thread={thread} replies={replies} /> */}
        </div>
    );
}

Show.layout = (page) => <App children={page} />;