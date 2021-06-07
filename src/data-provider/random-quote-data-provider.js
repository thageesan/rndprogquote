import QuotableAPI from "api/quotable";

const quotableApi = new QuotableAPI();

export default {
    name: "RandomQuoteDataProvider",
    created() {
        this.getRandomQuote();
    },
    data() {
        return {
            error: false,
            grade: 0,
            loading: true,
            quote: null,
            quotes: {}
        }
    },
    methods: {
        async getRandomQuote(tags = null) {
            this.loading = true;
            this.error = false;

            try {
                const response = await quotableApi.randomQuote(tags);
                if (response.hasOwnProperty('_id')) {
                    this.quote = response
                } else {
                    throw 'E0003 - Random quote response is not valid.'
                }
            } catch (e) {
                console.error(e);
                this.error = true;
            }

            this.loading = false;
        },

        async getQuote(tags = null) {
            this.loading = true;
            this.error = false;
            const limit = 150;
            
            
            try {

                if (tags === null) {
                    return await this.getRandomQuote();
                }

                let quotes = null;
                const map_key = tags.join();
                
                if (this.quotes.hasOwnProperty(map_key)) {
                    quotes = this.quotes[map_key];
                    
                } else {
                    const response = await quotableApi.getQuote(tags, limit);
                    quotes = response.results;
                    this.quotes[map_key] = quotes;
                } 
                
                if (Array.isArray(quotes) && quotes.length > 0) {

                    this.quote = quotes.pop();
                    
                } else {
                    await this.getRandomQuote();
                }
            } catch (e) {
                console.error(e);
                this.error = true;
            }

            this.loading = false;
        }
    },
    render() {
        return this.$scopedSlots.default({
            error: this.error,
            grade: this.grade,
            loading: this.loading,
            quote: this.quote,
            getRandomQuote: this.getRandomQuote,
            getQuote: this.getQuote
        })
    }
}
