import React from 'react';


export default function TokenDisplay(props) {
    // const [distributedSupply, setDistributedSupply] = useState(0);
    // const [remainingSupply, setRemainingSupply] = useState(0);

    return(
        <div className='mx-auto px-4 py-2 sm:px-6 md:px-8'>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div key='max' className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">Maximum Supply</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">1,000,000,000</dd>
                </div>
                {/* <div key='dist' className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">Distributed Supply</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">1,000,000,000</dd>
                </div>
                <div key='rem' className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">Remaining Supply</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">1,000,000,000</dd>
                </div> */}
            </dl>
    </div>
    )
}