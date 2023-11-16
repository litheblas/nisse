import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { OpenAPI } from './api'
import { AppShell } from './components/AppShell'
import { AddEventPage } from './pages/AddEventPage'
import { EditEventPage } from './pages/EditEventPage'
import { EventsPage } from './pages/EventsPage'
import { HomePage } from './pages/HomePage'
import { MailinglistsPage } from './pages/MailinglistsPage'
import { MemberPage } from './pages/MemberPage'
import { MembersListPage } from './pages/MembersListPage'
import { RouteErrorPage } from './pages/RouteErrorPage'

// Sets the URL of the backend API to the same as the frontend is served from
// if in production, otherwise it uses the value of the environment variable.
if (import.meta.env.PROD) {
  OpenAPI.BASE = import.meta.env.BASE_URL
} else {
  OpenAPI.BASE = import.meta.env.VITE_NISSE_BACKEND_API_URL
}

const router = createBrowserRouter(
  [
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
          path: '/members/',
          children: [
            {
              path: '',
              element: <MembersListPage />,
            },
            {
              path: ':memberId',
              element: <MemberPage />,
            },
          ],
        },
        {
          path: '/events/',
          children: [
            {
              path: '',
              element: <EventsPage />,
            },
            {
              path: 'add',
              element: <AddEventPage />,
            },
            {
              path: 'edit/:eventId',
              element: <EditEventPage />,
            },
          ],
        },
        {
          path: '/mailinglists',
          element: <MailinglistsPage />,
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
)

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
