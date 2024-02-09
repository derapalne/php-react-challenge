# php-react-challenge

<h3>Developing Challenge for BSMART</h3>

To run the project you need to install both servers and run them

To do this run:

On react-frontend:

<strong>
npm i<br>
npm run build<br>
npm run start<br>
</strong>
<br>
On php-backend:
<br>
<strong>
composer update<br>
php artisan key:generate<br>
php artisan migrate --seed<br>
php artisan serve<br>
</strong>
<br>
By default the frontend will run on port 3000 and backend on port 8000
To configure the frontend all you need is to add this in an .env file at root dir:<br>
<strong><br>
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/
</strong><br>
To configure the backend you need to configure the .env file like this:<br>
<strong><br>
DB_CONNECTION=sqlite<br>
DB_DATABASE=[your full path]\php-react-challenge\php-backend\database\database.sqlite<br>
DB_USERNAME=root<br>
DB_PASSWORD=<br>
DB_FOREIGN_KEYS=true<br>
</strong><br>
Other than those 5 lines you can keep the rest of the .env.example as is.
<br>

<h3>Routes:</h3>

On frontend these are the available routes:<br>

<strong>/</strong> => Shows a product list, filterable by category and orderable by price and date. If you're logged in you can access the edit page of your products and manage (create, edit, and delete) the categories <br>
<strong>/products/[id]</strong> => Shows a product in detail, with id [id]<br>
<strong>/products/edit/[id]</strong> => Shows a form to edit the product with id [id] <br>
<strong>/add-product</strong> => Shows a form to add products <br>
<strong>/signup</strong> => Shows a form for registration <br>
<strong>/login</strong> => Shows a form for login <br>
<strong>/logout</strong> => Erases browser credentials <br>
<strong>/refresh </strong>=> Utiliy route to redirect to / <br>

On backend these are the available routes:

<strong>GET /api/products</strong> => Shows all products. Orderable by param "order", filterable by category by param "category".<br>
<strong>GET /api/products/[id]</strong> => Shows the requested product.<br>
<strong>POST /api/products</strong> => Adds a product. Required body: title, category, description, category, image. (Protected with authentication)<br>
<strong>PUT /api/products/[id]</strong> => Edits a product. (Protected with authentication)<br>
<strong>DELETE /api/products/[id]</strong> => Deletes a product. (Protected with authentication)<br>

<strong>GET /api/categories</strong> => Shows all categories.<br>
<strong>GET /api/categories/[id]</strong> => Shows the requested category.<br>
<strong>POST /api/categories</strong> => Adds a category. Required body: name. (Protected with authentication)<br>
<strong>PUT /api/categories/[id]</strong> => Edits a category. (Protected with authentication)<br>
<strong>DELETE /api/categories/[id]</strong> => Deletes a category. (Protected with authentication)<br>

<strong>POST /api/auth/signup</strong> => For signing up. Required body: name, email, password, confirm_password.<br>
<strong>POST /api/auth/login</strong> => For logging in. Required body: email, password.<br>
<strong>POST /api/auth/logout</strong> => For logging out. (Protected with authentication)<br>
