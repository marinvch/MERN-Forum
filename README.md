### `Application Description`

This is FullStack MERN Aplication.


Used tech stack is: [Express, Mongoose, React, React-Material-UI]

for Demo => http://forum.marinvch.eu - unavailable for now
### `Application functionality`

1.This app contains CRUD operation
2.This app contains like and dislike functionality
3.This app contains login & register funcitionality
4.Create Edit or Delete Post 
5.Can add Comments to a specific Post - still developing mode

### `Application Setup`
1.clone the repo
2. Go to the folder and type npm install - it will install both backend and front end dependacys
3. Setup mongooDB local env for developing purposes
4. Add .env file with will contain value of JWT_Secret={secret key}
5. After seting up MongoDB type npm start and will run botch backend and frontend
6. in order to use Import need to go package.json and under main  "type":"module",
7. TODO documentation 

### Arhitecture
MERN-FORUM
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── Frontend
        ├── public
        ├── favicon.ico
        ├── index.html
        ├── logo192.png
        ├── logo512.png
        ├── manifest.json
        └── robots.txt
    └── src
    ├──Api
    ├── index.js
    ├── Components
          ├── Auth
              ├── Styles
                  ├── Login.css
                  ├── Register.css
              ├── Login.js
              ├── Register.js
          ├── Comment
              ├── Styles
                  ├── CreateComment.css
              ├── CreateComment.js
          ├── Post
              ├── Styles
                  ├── CreateComment.css
                  ├── Post.css
                  ├── Viewpost.css
              ├── CreatePost.js
              ├── EditPost.js
              ├── Posts.js
              ├── ViewPost.js
              ├── Profile
                  ├── Profile.js
                  ├── User.js
          ├── Styles
              ├── Footer.css
              ├── Header.css
              ├── Home.css   
          ├── Footer.js
          ├── Header.js
          ├── Home.js
          ├── Context
              ├── UserContext.js
          ├── App.css
          ├── App.js
          ├── Index.css
          ├── Index.js
   
### `Application functionality under developing`

1.Need to handle some validations
2.Need to add some other functionality to comments and User Profile for now only displays the number of posts he have created

### `Developer help`

If needed for more info you can contact me email:marinvch@gmail.com
