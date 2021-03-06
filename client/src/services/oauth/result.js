import {
    OAUTH_CANCEL,
    OAUTH_PROCESS_SUCCESS,
    OAUTH_PROCESS_FAILURE,
} from '@redux/actions/oauth'

export default class OAuthResult {
    /**
     * Result object class for OAuth process
     * @param {string} providerName Name string of the OAuth provider
     */
    constructor(providerName) {
        this.data = null
        this.provider = providerName
        this.status = null
    }

    /**
     * Append new result to the data object
     * @param {string} name Result name
     * @param {any} value Result value
     */
    addResult(name, value) {
        if (!this.data) this.data = {}
        this.data[name] = value
    }

    /**
     * Set status to a cancelled status string
     */
    setCancelStatus() {
        this.status = `${this.provider.toUpperCase()}_${OAUTH_CANCEL}`
    }

    /**
     * Set status to a success status string
     */
    setSuccessStatus() {
        this.status = `${this.provider.toUpperCase()}_${OAUTH_PROCESS_SUCCESS}`
    }

    /**
     * Set status to a failure status string
     */
    setFailureStatus() {
        this.status = `${this.provider.toUpperCase()}_${OAUTH_PROCESS_FAILURE}`
    }

    get output() {
        return {
            data: { provider: this.provider, ...this.data },
            status: this.status,
            source: OAuthResult.name,
        }
    }

    /**
     * Helper function to distinguish from other event data
     */
    static isResult(result) {
        return (
            typeof result === 'object' &&
            result !== null &&
            result.source === OAuthResult.name
        )
    }
}
