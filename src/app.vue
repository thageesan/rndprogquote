<template>
  <div>
    <h1>Random Programming Quotes</h1>
    <random-quote-data-provider>
      <div slot-scope="{ loading, error, quote, getRandomQuote, getQuote }">
        
        <div v-if="loading">
          <h3>Loading....</h3>
        </div>
        
        <div v-if="error">
          <h3>Something went wrong.</h3>
          <button v-on:click="getRandomQuote()">Try Again</button>
        </div>

        <div v-if="!loading && !error">
          <div>
            <span>
              {{ quote.content }}
            </span>
          </div>
          <div>
            <span>
              {{ quote.author }}
            </span>
          </div>
          <div>
            <span>Rate the quote out of 5 => </span>
            <button v-on:click="getRandomQuote()">1</button>
            <button v-on:click="getRandomQuote()">2</button>
            <button v-on:click="getRandomQuote()">3</button>
            <button v-on:click="getQuote(quote.tags)">4</button>
            <button v-on:click="getQuote(quote.tags)">5</button>
          </div>
        </div>
        
      </div>
    </random-quote-data-provider>
  </div>
</template>

<script>

import RandomQuoteDataProvider from "data-provider/random-quote-data-provider";

export default {
  name: "App",
  components: {
    "random-quote-data-provider": RandomQuoteDataProvider,
  }
}
</script>