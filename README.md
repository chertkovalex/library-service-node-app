# library-service-node-app

Library Service NodeJS App

1. Clone the repository
2. `npm install`
3. Start Docker with mongo:
   `docker run --rm -it -p 27017:27017 mongo`
4. Start server
   `npm run start`
5. Open browser `http://localhost:6032`

API
* Filter Books by Author:
`http://localhost:6032/books/?author=Aleksey+Tolstoy`
* Filter Books by Year:
`http://localhost:6032/books/?year=1856` 
