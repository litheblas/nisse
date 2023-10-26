import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { OpenAPI } from './api'
import './App.css'
import { AppShell } from './components/AppShell'
import { eventsListLoader } from './loaders/EventsListLoader'
import { memberLoader } from './loaders/MemberLoader'
import { EventsListPage } from './pages/EventsListPage'
import { HomePage } from './pages/HomePage'
import { MailinglistsPage } from './pages/MailinglistsPage'
import { MemberPage } from './pages/MemberPage'
import { MembersPage } from './pages/MembersPage'
import { RouteErrorPage } from './pages/RouteErrorPage'

// Sets the URL of the backend API to the same as the frontend is served from
// if in production, otherwise it uses the value of the environment variable.
if (import.meta.env.PROD) {
  OpenAPI.BASE = import.meta.env.BASE_URL
} else {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  OpenAPI.BASE = import.meta.env.VITE_NISSE_BACKEND_API_URL
}

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
        path: '/events',
        element: <EventsListPage />,
        loader: eventsListLoader,
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
