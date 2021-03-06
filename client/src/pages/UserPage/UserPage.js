import React, { useEffect } from 'react'

import UserResource from '@containers/UserResource'
import useUserInfo from '@hooks/use-user-info'

/**
 * User information management page container
 */
export default () => {
    const [hasIdentifier, , loadUserInfo] = useUserInfo()

    useEffect(() => {
        if (hasIdentifier) {
            loadUserInfo()
        }
    }, [hasIdentifier, loadUserInfo])

    return (
        <div className='h-full text-left flex flex-col lg:grid lg:grid-cols-6 lg:grid-rows-user-page'>
            <div
                className={`my-2 flex-1 md:my-0 md:flex-initial lg:col-span-4 lg:row-span-${
                    hasIdentifier ? '1' : '2'
                } lg:mr-8`}
            >
                <UserResource.Profile />
            </div>
            <div className='flex-1 my-2 last:mb-6 md:mb-0 md:last:mb-0 lg:col-span-2 lg:row-span-2 lg:my-0'>
                <UserResource.Connection />
            </div>
            {hasIdentifier && (
                <div className='mt-2 flex-1 last:mb-6 md:m-0 md:last:mb-0 lg:col-span-4 lg:mr-8 lg:row-start-2 lg:row-span-1'>
                    <UserResource.Action />
                </div>
            )}
        </div>
    )
}
