import { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { Inertia } from '@inertiajs/inertia';

export default function Filter({categories, initialCategory}) {
    const [selected, setSelected] = useState(initialCategory);
    const [query, setQuery] = useState('');
    

    
    const filteredcategories =
        query === ''
            ? categories
            : categories.filter((category) =>
                category.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            );

    useEffect(() => {
        typeof(selected) == 'object' ? Inertia.get('/threads?category=', { category: selected.slug }, { preserveState: true }) : '';
    }, [selected]);
    return (
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
                                            `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-white bg-blue-600' : 'text-gray-900'
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
    );
}
