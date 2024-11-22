# Starlit Chronicles

**Starlit Chronicles** is a dynamic and interactive blog platform built with Next.js and Tailwind CSS. It aims to provide captivating content on travel, music, and photography, offering users a seamless and responsive experience. This blog integrates authentication, roles-based pages, and CRUD functionality for users and posts.

## Features
- **Authentication**: Secure login and registration system.
- **Roles-based Access**: Admins and users have different levels of access.
- **CRUD Operations**: Admin can create, read, update, and delete blog posts.
- **Responsive Design**: Optimized for mobile and desktop experiences.
- **Modern UI**: Clean, intuitive, and accessible user interface built with Tailwind CSS.

## Technologies Used
- **Next.js**: React-based framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **MongoDB**: Database for storing user and post data.
- **JWT Authentication**: Secure JSON Web Token-based user authentication.

## Installation

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (v14 or higher)
- MongoDB (or use a cloud-based service like MongoDB Atlas)

### Steps to Run the Project Locally

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Hemanthvcs07/Starlit-Chronicles.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd Starlit-Chronicles
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Create a `.env.local` file**:
   Set up your environment variables by adding the following to your `.env.local` file:

   ```plaintext
   MONGODB_URI=your_mongo_database_uri
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Run the development server**:

   ```bash
   npm run dev
   ```

   Now, open `http://localhost:3000` in your browser to see the app in action.

## Features and Functionality

- **User Authentication**: Users can register, login, and logout securely. Admins have additional privileges to manage blog posts.
- **CRUD for Blog Posts**: Admins can create new posts, update existing ones, and delete posts as needed.
- **Responsive Layout**: The blog is fully responsive, ensuring it looks great on both mobile and desktop screens.

## Contributing

We welcome contributions! If you'd like to contribute to the development of **Starlit Chronicles**, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -am 'Add feature'`).
4. Push your changes (`git push origin feature-name`).
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, feel free to open an issue or contact me directly.

**Hemanth Venkata Chowdary**  
[GitHub](https://github.com/Hemanthvcs07)  
[LinkedIn](https://www.linkedin.com/in/hemanthvcs07/)
