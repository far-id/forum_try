import React from 'react';

export default function ProfilePicture({src, alt}) {
    return <img src={src} alt={alt} className="w-8 h-8 mt-2 mr-3 border-white rounded-full" />
;
}

