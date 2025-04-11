<body>

<h1>MERN Blog App API Documentation</h1>
<p>A Full stack Blog Application built with MongoDB, Express JS, Nextjs and Nodejs featuring an admin panel. Backend is built in a modular structure, making every part of the backend modular for scalability and maintainability. More features to come including user interactions, comments, etc. 
Work in progress.</p>

<p>Base URL: <code>http://localhost:3000</code></p>

<h2>Frontend Endpoints</h2>

<h3>Auth</h3>
<h4>Register</h4>
<p><strong>URL:</strong> <code>/api/v1/auth/register</code></p>
<p><strong>Method:</strong> POST</p>
<pre><code>{
  "username": "test",
  "password": "test12345",
  "email": "test@blog.com",
  "bio": "Hello world"
}</code></pre>

<h4>Login</h4>
<p><strong>URL:</strong> <code>/api/v1/auth/login</code></p>
<p><strong>Method:</strong> POST</p>
<pre><code>{
  "username": "test",
  "password": "test12345"
}</code></pre>

<h3>User</h3>
<h4>User Details</h4>
<p><strong>URL:</strong> <code>/api/v1/user-details</code></p>
<p><strong>Method:</strong> GET</p>
<p><strong>Authorization:</strong> Bearer Token</p>

<h3>Blogs</h3>
<h4>Get Blogs</h4>
<p><strong>URL:</strong> <code>/api/v1/blogs?limit=20</code></p>
<p><strong>Method:</strong> GET</p>
<p><strong>Query Parameters:</strong></p>
<ul>
  <li><code>limit</code>: Number of blogs to fetch (e.g., <code>20</code>)</li>
  <li><code>page</code>: Page number (Optional)</li>
</ul>

<h3>Categories</h3>
<h4>Get All Categories</h4>
<p><strong>URL:</strong> <code>/api/v1/categories/</code></p>
<p><strong>Method:</strong> GET</p>

<h4>Get Category</h4>
<p><strong>URL:</strong> <code>/api/v1/categories/:categoryId</code></p>
<p><strong>Method:</strong> GET</p>

<h2>Admin Endpoints</h2>

<h3>Auth</h3>
<h4>Login</h4>
<p><strong>URL:</strong> <code>/admin/v1/auth/login</code></p>
<p><strong>Method:</strong> POST</p>
<pre><code>{
  "username": "admin",
  "password": "admin"
}</code></pre>

<h3>Blog</h3>
<h4>Create Blog</h4>
<p><strong>URL:</strong> <code>/admin/v1/blogs/create-blog</code></p>
<p><strong>Method:</strong> POST</p>
<p><strong>Authorization:</strong>: Bearer Token </p>

<table>
<thead>
<tr>
<th style="width:30%">Key Name </th >
<th >Value </th ></tr ></thead>
<tbody>
<tr>
<td>title</td>
<td>How to Build a Blog with Next.js and MongoDB</td>
</tr>
<tr>
<td>content</td>
<td>This post explains how to build a full-stack blog using Next.js, MongoDB, and Mongoose...</td>
</tr>
<tr>
<td>categories[0]</td>
<td>66166f865aa7c7e9f8c439a1</td>
</tr>
<tr>
<td>categories[1]</td>
<td>66166f865aa7c7e9f8c439a2</td>
</tr>
<tr>
<td>tags[0]</td>
<td>nextjs</td>
</tr>
<tr>
<td>tags[1]</td>
<td>mongodb</td>
</tr>
<tr>
<td>tags[2]</td>
<td>fullstack</td>
</tr>
<tr>
<td>tags[3]</td>
<td>tutorial</td>
</tr>
</tbody>
