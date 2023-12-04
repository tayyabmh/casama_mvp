import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/outline';

export default function ConnectAlert() {
    return (
        <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <InformationCircleIcon className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className='text-sm text-yellow-700'>You've already launched a token, go to "Home" to see more.</p>
                </div>
            </div>
        </div>
    )
}