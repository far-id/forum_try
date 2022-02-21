import React from 'react';
import BestAnswer from './BestAnswer';
import Likes from './Likes';
import Button from './Button';
import ProfilePicture from './ProfilePicture';
import { Link } from '@inertiajs/inertia-react';

export default function ReplyBlock({ reply, thread, auth, showChildReplyForm, submitHandler, changeHandler, data, setData }) {
    console.log(reply.parent_id == null);
    return (
        <div className='ml-6'>
            <div className="flex justify-between px-6 py-2 bg-white rounded-lg shadow">
                <div className='flex'>
                    <ProfilePicture src={reply.user.picture} alt={reply.user.name} />
                    <div>
                        <div className="flex items-center gap-x-2">
                            <span className="font-semibold" >{reply.user.name}</span>
                            <span>|</span>
                            <span className="text-sm text-gray-500" >{reply.created_at}</span>
                        </div>
                        <div>
                            {reply.body}
                        </div>
                    </div>
                </div>
                {/* kalo auth dan thread itu milik dia maka tampilkan kontrol
                kalo auth tapi thread bukan punya dia maka tampilkan ikon
                kalo ga auth maka tampilkan ikon */}
                {auth.user ? auth.user.id == thread.user.id ? (
                        <Link href={route('answer', thread.slug)} method="post" as="button" data={{ answer_id: reply.id }} preserveScroll title="Mark Best Answer"
                            className={`${thread.answer_id == reply.id ? 'text-blue-700' : 'text-gray-500/25 hover:text-black'} my-auto`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </Link>
                ) : thread.answer_id == reply.id && (
                    <span className="my-auto text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                    </span>
                ) : thread.answer_id == reply.id && (
                        <span className="my-auto text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </span>
                )}
            </div>
            <div className="flex items-center mt-1 ml-16 gap-x-3">
                <div className="flex items-center">
                    <Likes model="reply" id={reply.id} likes_count={reply.likes_count} />
                </div>
                {auth.user && reply.parent_id == null && (
                    <button onClick={() => showChildReplyForm(reply)}>Reply</button>
                )}
                {/* <BestAnswer thread={thread} reply={reply} /> */}
            </div>
            {reply.children.length ? reply.children.map((child, i) => 
                    <ReplyBlock key={i} {...{ reply: child, thread, auth, showChildReplyForm, submitHandler, changeHandler, data, setData }} />
            ): ''}
            {
                data.parent_id ? data.parent_id == reply.id && (
                    <form onSubmit={submitHandler}>
                        <div className='mb-3'>
                            <textarea autoFocus name="body" id="body" className='w-full ' value={data.body} onChange={changeHandler}></textarea>
                        </div>
                        <div className="flex gap-x-3">
                            <button onClick={() => setData({ ...data, parent_id: null, body: '' })} className='inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase transition duration-150 ease-in-out bg-gray-100 border border-transparent rounded-md active:bg-gray-100'>
                                Cancel
                            </button>
                            <Button>
                                Reply
                            </Button>
                        </div>
                    </form>
                )
                    : ''
            }
        </div>
    );
}

