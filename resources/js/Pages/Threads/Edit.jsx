import Button from '@/Components/Button';
import App from '@/Layouts/App';
import { useForm } from '@inertiajs/inertia-react';
import React from 'react';

export default function Edit({thread, categories}) {
    const { data, setData, put, errors } = useForm({
        title: thread.title,
        body: thread.body,
        category_id: thread.category_id
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        put(route('threads.update', thread.slug), data);
    }
    return (
        <div>
            <h1 className='mb-4 text-xl'>Edit Thread {thread.title}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="title">
                        Title
                    </label>
                    <input onChange={handleChange} value={data.title} type='text' className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="title" name="title" />
                    {errors.title && <p className="text-xs italic text-red-500">{errors.title}</p>}
                </div>
                <div className="mb-3">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="body">
                        Body
                    </label>
                    <textarea onChange={handleChange} value={data.body} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="body" name="body" rows="3"></textarea>
                    {errors.body && <p className="text-xs italic text-red-500">{errors.body}</p>}
                </div>
                <div className="flex items-center mb-3">
                    <label className="block mb-2 mr-3 text-sm font-bold text-gray-700" htmlFor="category">
                        Category
                    </label>
                    <select onChange={handleChange} value={data.category_id} className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="category_id" name="category_id">
                        <option value="">Choise Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    {errors.category_id && <p className="text-xs italic text-red-500">{errors.category_id}</p>}
                </div>
                <Button>
                    Update
                </Button>
            </form>
        </div>
    );
}

Edit.layout = (page) => <App children={page} title="Edit" />;