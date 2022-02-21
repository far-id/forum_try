import Button from '@/Components/Button';
import { useForm } from '@inertiajs/inertia-react';
import React from 'react';
import BestAnswer from './BestAnswer';
import Likes from './Likes';
import ReplyBlock from './ReplyBlock';

function Reply({thread, replies, auth}) {
    const { data, setData, reset, post } = useForm({
        body: '',
        parent_id: ''
    })

    const changeHandler = (e) => setData(e.target.name, e.target.value);

    const showChildReplyForm = (parent) =>{
        setData({...data, parent_id: parent.id, body: ''});
    }
    const submitHandler = (e) => {
        e.preventDefault();
        post(route('threads.reply', thread.slug), {
            onSuccess: () => reset(),
            preserveScroll: true
        })
    }
    return (
        <div>
            <div className='my-4 space-y-3'>
                {replies.length > 0 ? (
                    replies.map((reply, i) => (
                        <ReplyBlock key={i} {...{reply, thread, auth, showChildReplyForm, submitHandler, changeHandler, data, setData}} />
                    ))
                ) : (
                    <div className='text-center text-gray-600'>
                        No replies yet
                    </div>
                )}
            </div>

            {auth.user ? !data.parent_id && (
                <form onSubmit={submitHandler}>
                    <div className='mb-3'>
                        <textarea name="body" id="body" className='w-full ' value={data.body} onChange={changeHandler}></textarea>
                    </div>
                    <Button>
                        Reply
                    </Button>
                </form>
            ): ''}
        </div>
    );
}

export default Reply;