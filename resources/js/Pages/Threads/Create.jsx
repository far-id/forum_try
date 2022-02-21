import Button from '@/Components/Button';
import App from '@/Layouts/App';
import { useForm } from '@inertiajs/inertia-react';
import React from 'react';

export default function Create({ categories}) {
    const { data, setData, post, errors } = useForm({
        title: '',
        body: '',
        category_id: '',
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('threads.store'), data);
};
    return (
        <div>
            <h1 className='mb-4 text-xl'>Create New Thread</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="title">
                        Title
                    </label>
                    <input onChange={handleChange} type='text' className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="title" name="title" />
                    {errors.title && <p className="text-xs italic text-red-500">{errors.title}</p>}
                </div>
                <div className="mb-3">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="body">
                        Body
                    </label>
                    <textarea onChange={handleChange} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="body" name="body" rows="3"></textarea>
                    {errors.body && <p className="text-xs italic text-red-500">{errors.body}</p>}
                </div>
                <div className="flex items-center mb-3">
                    <label className="block mb-2 mr-3 text-sm font-bold text-gray-700" htmlFor="category">
                        Category
                    </label>
                    <select onChange={handleChange} className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="category_id" name="category_id">
                        <option selected value="">Choise Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    {errors.category_id && <p className="text-xs italic text-red-500">{errors.category_id}</p>}
                </div>
                <Button>
                    Create
                </Button>
            </form>
        </div>
    );
}

Create.layout = (page) => <App children={page} title="Create New Thread" />;