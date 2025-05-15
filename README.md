# DevLink

Full-stack MERN web app geared towards developers to share and organize learning material and collaborate on each other's thoughts and perspective's on an everchanging tech space

### Live Site

- https://dev-link-six-xi.vercel.app/

---

## Features

- Authentication JWT + bcrypt for password hashing
- Tiptap editor for resource creation
- Comment CRUD functionality
- User Profile with related information
- User specific permissions for related resources/comments
- Material UI intergration (needs more work 5/15)

---

## Technologies

**Frontend:**

- React (Vite)
- React Router
- Tiptap
- Material UI

**Backend:**

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

---

## Folder Structure

```
frontend/
├── src/
│   ├── components/         # Navbar, private routes
│   ├── context/            # Auth context
│   ├── pages/              # Home, Profile, Create, Edit
│   ├── api/                # Fetch helpers
│   └── App.jsx             # Routes + layout

backend/
├── models/                 # Mongoose schemas
├── routes/                 # Auth, resources, comments
├── middleware/             # Auth middleware
└── server.js               # Entry point

```

---

### Security NOTES

- should consider adding joi, if time allots . security and validation are pretty high already:

- mongoose schema: https://mongoosejs.com/docs/guide.html
- helmet: https://www.npmjs.com/package/helmet
- select method to hide data: https://www.geeksforgeeks.org/mongoose-query-prototype-select-api/
- jwt encryption: https://www.npmjs.com/package/jsonwebtoken
- bcryptjs- 10 salt rounds : https://www.npmjs.com/package/bcryptjs
- regex: https://digitalfortress.tech/tips/top-15-commonly-used-regex/

---

### ATTRIBUTIONS

logo- <a href="https://www.flaticon.com/free-icons/book" title="book icons">Book icons created by mikan933 - Flaticon</a>
light/dark icon - <a href="https://www.flaticon.com/free-icons/light-dark" title="light dark icons">Light dark icons created by Any Icon - Flaticon</a>

---

### RESOURCES

- <a href="https://www.youtube.com/watch?v=EVOFt8Its6I" title="Multer">Understanding File Uploads in Node.js using Multer - Web Development Concepts Explained</a>
- <a href="https://www.youtube.com/watch?v=UkqgaKJxfZ0" title="Cloudinary">Ultimate Guide to Cloudinary Image/Video Uploads in MERN Stack | Step-by-Step Tutorial</a>
- <a href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9g6m_6Sld9Q4jzqdqHd2HiD" title="REGEX">REGEX by Net Ninja</a>
- <a href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE" title="MERN">MERN by Net Ninja</a>
- <a href="https://www.youtube.com/watch?v=WsRBmwNkv3Q&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT" title="Auth">MERN JWT BCRYPT by Net Ninja</a>
- <a href="https://mui.com/" title="MUI">Material UI component library</a>
- <a href="https://www.youtube.com/watch?v=0KEpWHtG10M&list=LL&index=4" title="">Material UI tutorial by Net Ninja</a>
- <a href="https://www.youtube.com/watch?v=xfKYYRE6-TQ&list=LL&index=11&t=53s" title="">React Hooks by PedroTech</a>
- <a href="https://www.youtube.com/watch?v=QVffer2fRfg&list=LL&index=18" title="tiptap">Tiptap tutorial by Cand Dev</a>
- <a href="https://www.youtube.com/watch?v=SqcY0GlETPk&list=LL&index=22&t=2111s" title="">React Tutorial by Programmng with Mosh</a>
- <a href="https://www.youtube.com/watch?v=DZBGEVgL2eE&t=1135s" title="Mongoose">Mongoose Tutorial by Web Dev Simplified</a>
- <a href="https://www.youtube.com/watch?v=7Q17ubqLfaM&t=108s" title="JWT">JWT by Web Dev Simplified</a>
- <a href="https://jwtsecret.com/generate" title="">JWT Secret Generator</a>

---

### Notes:

- add comments and have it display below resource
- adding comment amount below recouse preview
- need to limit preview to 10 OR consider pagination
- optimize images?
- tiptap bullets are acting buggy
- logout should have a settimeout rendering a goodbye
- profile should have a stat card
- Make sure to come back to the back end to implement multer and adding connection to cloudinary image hosting
