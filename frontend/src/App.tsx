import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { AppShell } from './components/AppShell'
import { memberLoader } from './loaders/MemberLoader'
import { EventsPage } from './pages/EventsPage'
import { HomePage } from './pages/HomePage'
import { MailinglistsPage } from './pages/MailinglistsPage'
import { MemberPage } from './pages/MemberPage'
import { MembersPage } from './pages/MembersPage'
import { RouteErrorPage } from './pages/RouteErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/members',
        element: <MembersPage />,
      },
      {
        path: '/member/:memberId',
        element: <MemberPage />,
        loader: memberLoader,
      },
      {
        path: '/events/:eventId',
        element: <EventsPage />,
      },
      {
        path: '/mailinglists',
        element: <MailinglistsPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
