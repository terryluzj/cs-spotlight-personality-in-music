import React from 'react'
import PropTypes from 'prop-types'

import toCamelCase from '@utils/camel-case'

/**
 * Heading component
 */
const Heading = ({ text, subheading }) => (
    <h2 className='font-extrabold text-default-black text-2xl my-2 md:text-2xl md:my-3'>
        {text}
        {subheading !== '' && (
            <div className='text-default-gray text-sm font-normal'>
                {toCamelCase(subheading)}
            </div>
        )}
    </h2>
)

Heading.propTypes = {
    /**
     * Text string
     */
    text: PropTypes.string.isRequired,
    /**
     * Subheading text string
     */
    subheading: PropTypes.string,
}

Heading.defaultProps = {
    subheading: '',
}

export default Heading
