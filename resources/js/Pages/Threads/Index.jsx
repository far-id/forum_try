import Likes from '@/Components/Likes';
import Pagination from '@/Components/Pagination';
import App from '@/Layouts/App';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { debounce, pickBy } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import ProfilePicture from '@/Components/ProfilePicture';
import { Fragment } from 'react';
import { Listbox, Combobox, Transition } from '@headlessui/react';

const orders = [
    { name: 'Latest', value: 'latest' },
    { name: 'Oldest', value: 'oldest' },
    { name: 'most liked', value: 'most-liked' },
    { name: 'most replied', value: 'most-replied' },
    { name: 'popular this week', value: 'popular-this-week' },
    { name: 'popular this month', value: 'popular-this-month' },
    { name: 'popular this year', value: 'popular-this-year' },
    { name: 'popular all time', value: 'popular-all-time' },
    { name: 'my questions', value: 'my-questions' },
    { name: 'my participated', value: 'my-participated' },
    { name: 'my best answers', value: 'my-best-answers' },
    { name: 'solved', value: 'solved' },
    { name: 'unsolved', value: 'unsolved' },
    { name: 'no reply yet', value: 'no-reply-yet' },
];

function Filter({ categories,  keyword, setKeyword, filter }) {
    let findCategory = categories.find(category => category.slug === filter.category);
    let findOrder = orders.find(order => order.value === filter.order);
    const [selected, setSelected] = useState(findCategory || '');
    const [query, setQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(findOrder || orders[0]);

    const filteredcategories =
        query === ''
            ? categories
            : categories.filter((category) =>
                category.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            );

    const reload = useCallback(
        debounce((q,c, o) => {
            Inertia.get('/threads', pickBy({ search: q, page: filter.page, category: c.slug, order: o.value }), { preserveState: true });
        }, 600)
    , []);

    useEffect(() => {
        reload(keyword, selected, selectedOrder)
    }, [keyword, selected, selectedOrder]);
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
                {/* category */}
                <div className="max-w-full">
                    <Combobox value={selected} onChange={setSelected}>
                        <div className="relative mt-1">
                            <div className="relative w-full overflow-hidden text-left bg-white rounded-md shadow-md cursor-default focus:outline-none focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-blue-300 focus-visible:ring-offset-2 sm:text-sm">
                                <Combobox.Input
                                    placeholder="Choose a category"
                                    className="w-full py-2 pl-3 pr-10 text-sm leading-5 border-transparent rounded-md caret-blue-600 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    displayValue={(category) => category.name || category}
                                    onChange={(event) => setQuery(event.target.value)}
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Combobox.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {filteredcategories.length === 0 && query !== '' ? (
                                        <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        filteredcategories.map((category) => (
                                            <Combobox.Option
                                                key={category.id}
                                                className={({ active }) =>
                                                    `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-blue-900 bg-blue-100' : 'text-gray-900'
                                                    }`
                                                }
                                                value={category}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {category.name}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-blue-600'
                                                                    }`}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))
                                    )}
                                </Combobox.Options>
                            </Transition>
                        </div>
                    </Combobox>
                </div>
                {/* order */}
                <div className="w-56">
                    <Listbox value={selectedOrder} onChange={setSelectedOrder}>
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-blue-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                <span className="block capitalize truncate">{selectedOrder.name}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {orders.map((order, orderIdx) => (
                                        <Listbox.Option
                                            key={orderIdx}
                                            className={({ active }) =>
                                                `cursor-default select-none relative py-2 pl-10 pr-4 capitalize ${active ? 'text-blue-900 bg-blue-100' : 'text-gray-900'
                                                }`
                                            }
                                            value={order}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block capitalize truncate ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {order.name}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
            </div>
            {/* Search */}
            <div className="relative mt-1 overflow-hidden rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}
                    name="search" id="search" placeholder="Search..."
                    className="w-full pr-12 ml-1 border-gray-300 rounded-md caret-blue-600 focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm" />
            </div>
        </div>
    );
}


export default function Index(props) {
    const { categories, filter } = props;
    const { data: threads, meta } = props.threads;
    const [ keyword, setKeyword ] = useState(filter.search || '');

    return (
        <div>
            <Filter {...{categories, keyword, setKeyword, filter}} />
            {threads.map(thread => (
                <div key={thread.id} className="flex px-4 py-3 my-4 bg-white rounded-lg shadow">
                    <ProfilePicture src={thread.user.picture} alt={thread.user.name}/>
                    <div className='block ml-3'>
                        <Link href={route('threads.show', thread.slug)} className="mb-1 text-xl font-semibold text-gray-900">
                            {thread.title}
                        </Link>
                        <div className="mb-5 text-base font-light text-gray-700">
                            {thread.teaser}
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-x-3">
                                <div className="font-semibold text-blue-700">
                                    {thread.user.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {thread.created_at}
                                </div>
                                <Link href={`threads?category=${thread.category.slug}`} className="px-2 py-1 text-sm text-white bg-blue-600 rounded-xl">
                                    {thread.category.name}
                                </Link>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <div className="flex items-center gap-x-1">
                                    <Likes model="thread" id={thread.id} likes_count={thread.likes_count} />
                                </div>
                                <div className="flex items-center gap-x-1">
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
                </div>
            ))}
            <Pagination meta={meta} />
        </div>
    );
}

Index.layout = (page) => <App children={page} />;