import { request } from "core/request";


export default class QuotableAPI {

    __base_url = 'https://api.quotable.io'

    async randomQuote(tags = null) {
        try {
            if (tags && Array.isArray(tags) && tags.length > 0) {
                return await request(`${this.__base_url}/random?tags=${tags.join()}`, 'GET')
            } else {
                return await request(`${this.__base_url}/random`, 'GET')
            }
            
        } catch (e) {
            console.error('[E0001] - Unable to obtain random quote.');
            throw e;
        }
    }

    async getQuote(tags = null, limit = 1) {
        try {
            return await request(`${this.__base_url}/quotes?tags=${tags.join()}&limit=${limit}`)
        } catch (e) {
            console.error('[E0002] - Unable to obtain quote')
            throw e;
        }
    }


}