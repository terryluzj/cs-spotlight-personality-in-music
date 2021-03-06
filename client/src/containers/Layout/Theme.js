import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Icon from '@components/Icon'
import { toggleTheme } from '@redux/actions/theme'
import { themeSelector } from '@redux/selectors/theme'

/**
 * Theme toggler component
 */
export default () => {
    const dispatch = useDispatch()
    const currentTheme = useSelector(themeSelector)
    const isDark = currentTheme === 'dark'
    return (
        <button
            className='flex rounded md:bg-default-white group'
            type='button'
            onClick={() => dispatch(toggleTheme())}
        >
            <span className='duration-200 p-2 transition-opacity md:group-hover:opacity-75'>
                <Icon name='moon' className={`h-6 ${isDark ? '' : 'hidden'}`} />
                <Icon name='sun' className={`h-6 ${isDark ? 'hidden' : ''}`} />
            </span>
        </button>
    )
}
