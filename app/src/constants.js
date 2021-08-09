const prod = {
    url: {
     API_URL: 'https://letter-writer-api.herokuapp.com/api'
     }
   };
   const dev = {
    url: {
     API_URL: 'http://localhost:8080/api'
    }
   };

export const config = process.env.NODE_ENV === 'development' ? dev : prod;