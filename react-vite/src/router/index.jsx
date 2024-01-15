import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import MainPage from '../components/MainPage/MainPage';
import CreatePost from '../components/CreatePost/CreatePost';
import ViewPost from '../components/ViewPost/ViewPost';
import ViewCommunity from '../components/ViewCommunity/ViewCommunity';
import UpdatePost from '../components/UpdatePost/UpdatePost';
import MyStuff from '../components/MyStuff/MyStuff';

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
      },
      {
        path: "/posts/:id",
        element: <ViewPost />
      },
      {
        path: "/posts/:id/update",
        element: <UpdatePost />
      },
      {
        path: "communities/:communityId",
        element: <ViewCommunity />
      },
      {
        path: '/mystuff',
        element: <MyStuff />
      }
    ],
  },
]);
