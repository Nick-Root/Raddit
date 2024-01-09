import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import MainPage from '../components/MainPage/MainPage';
import CreatePost from '../components/CreatePost/CreatePost';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SignupFormPage />,
      },
      {
        path: '/home',
        element: <MainPage />
      },
      {
        path: "/posts/new",
        element: <CreatePost />
      }
    ],
  },
]);
