import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from '../pages/MainPage'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'; 
import { store } from '../store/store'
import Header from '../widgets/Header'
import AnalyticsPage from '../pages/AnaliticsPage'


const router = createBrowserRouter([
  {
    path: "/timeManagement",
    element:<div className='wrapper'>
      <Header/>
      <Outlet/>
    </div>,
    children:[
      {
        index: true,
        element: <MainPage/>
        
      },
      
      {
        path: "analytics",
        element: <AnalyticsPage/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
</StrictMode>,
)
