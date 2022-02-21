import { Link } from '@inertiajs/inertia-react';
import React from 'react';

export default function Pagination({ meta }) {
    return (
        <div className="flex my-7">
            {meta.links.map((link, key) => {
                return link.url == null ? <span key={key} className='px-2 py-1 text-gray-500' dangerouslySetInnerHTML={{ __html: link.label }} /> :
                    <Link href={link.url} key={key}
                        className={`${link.active ? 'text-gray-900 bg-white rounded-lg shadow-md' : 'text-gray-800'} px-3 py-2`}
                        dangerouslySetInnerHTML={{ __html: link.label }} />
            })}
        </div>
    );
}   