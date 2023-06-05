# a-blog-site

A MERN stack programming excercise.

A blog site where users can register and post their own blog posts.

https://asdf-blog.onrender.com

Allow some time for the content to show up, as the server side may need to spin up.

# Installation

Install dependencies on both 'server' and 'client' folders:

`/server> yarn install`

`/client> yarn install`

Create a new file on /server named config.env and add the required variables to it (Change these as needed)

`/server/config.env`
> MONGO_URI=mongodb://127.0.0.1:27017/blogsite (Connection string to your MongoDB deployment)
>
> PORT=5000 (Your desired port number, defaults to 5000)
>
> CORS_ORIGIN=http://localhost:3000 (IP to your frontend, to allow it to receive data from the backend)
> 
> SECRET=secret_key

Also in the root of the client folder, create a new file named .env and add this variable:

`/client/.env`
> REACT_APP_SERVER_URL = "http://localhost:5000" (IP to your backend)

Start the server and run the app

`/server> node server.js`

`/client> yarn start`
