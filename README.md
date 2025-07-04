# 🛍️ WooCommerce Product Sync Frontend (React / Next.js)

A frontend interface built with **Next.js 15** and **Tailwind CSS**, allowing sellers to register, login, and manage products that sync directly with a WooCommerce store via a custom backend.

---

## ⚙️ Tech Stack

- [Next.js 15](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/) (directly used inside components/pages)
- REST API Integration with custom Express backend

---

## 🚀 Features

- 👤 Seller registration and login
- 📦 Add product form (Title, Price, Description, Stock, etc.)
- 🔁 Product sync with WooCommerce
- 📝 Edit existing products
- ❌ Delete products from WooCommerce + database
- 📋 Product listing page
- ⚡ Form validation and loading states



---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Nitin-Saxena-ns/your-frontend-repo.git
cd your-frontend-repo
2. Install Dependencies
bash
Copy
Edit
npm install
3. Create .env.local
env
Copy
Edit
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
Replace with your deployed backend URL when going live.

4. Run the Development Server
bash
Copy
Edit
npm run dev
The app will be available at: http://localhost:3000

🔌 Connected API Endpoints
These API routes are consumed directly from your custom backend:

Method	Endpoint	Description
POST	/api/register	Register a new seller
POST	/api/login	Login and get token
GET	/api/products	Fetch all products
POST	/api/products	Create and sync product
PUT	/api/products/:id	Update existing product
DELETE	/api/products/:id	Delete product from system

✅ Forms & State
Forms built using basic useState hooks or React Hook Form

All API calls made using Axios inside components

No Redux or external state management used

📃 License
MIT

👨‍💻 Author
Nitin Saxena
GitHub

yaml
Copy
Edit

---

### 🔄 Optional Add-ons You Can Ask Me For:
- ✅ README with Vercel deployment guide
- ✅ Combined README if backend + frontend in one repo
- ✅ Postman collection for your API
- ✅ If you later create `/services/api.js` abstraction, I can give updated docs too

Let me know if you'd like any of these!
