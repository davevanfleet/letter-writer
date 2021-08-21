const prod = {
  url: {
    API_URL: 'https://letter-writer-api.herokuapp.com/api'
  },
  priceIds: {
    english: "price_1JQeEtGG42J6bTfiXdw4AxOL",
    spanish: "price_1JQeFVGG42J6bTfiR7humddn",
    foreignLang: "price_1JQeG3GG42J6bTfi8eJh5zme"
  }
};

const dev = {
  url: {
    API_URL: 'http://localhost:8080/api'
  },
  priceIds: {
    english: "price_1JQeEtGG42J6bTfiXdw4AxOL",
    spanish: "price_1JQeFVGG42J6bTfiR7humddn",
    foreignLang: "price_1JQeG3GG42J6bTfi8eJh5zme"
  }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;