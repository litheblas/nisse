import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { OpenAPI } from './api'
import { AppShell } from './components/AppShell'
import AuthProvider from './context/AuthProvider'
import { AddEventPage } from './pages/AddEventPage'
import { EditEventPage } from './pages/EditEventPage'
import { EventsPage } from './pages/EventsPage'
import { HomePage } from './pages/HomePage'
import { InformationChannelsPage } from './pages/InformationChannelsPage'
import { MemberPage } from './pages/MemberPage'
import { MembersListPage } from './pages/MembersListPage'
import { RouteErrorPage } from './pages/RouteErrorPage'

OpenAPI.BASE = import.meta.env.VITE_NISSE_BACKEND_API_URL

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
          path: '/informationChannels',
          element: <InformationChannelsPage />,
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
)

const queryClient = new QueryClient()

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
