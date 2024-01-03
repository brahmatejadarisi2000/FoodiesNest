import React from 'react';
import './app.css';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import FeatureHeader from './features/FeatureHeader';
import FeatureMonitor from './features/FeatureMonitor';
import FeatureRestaurantMenu from './features/FeatureRestaurantMenu';
import FeatureSearch from './features/FeatureSearch';
import FeatureMenuBranch from './features/FeatureMenuBranch';
import { Provider } from 'react-redux';
import { rootStore } from './store/root.store';
import FeatureCheckOut from './features/FeatureCheckOut';
import FeaturesDialog from './features/FeatureDialog';
import FeatureComboReco from './features/FeatureComboReco';
import FeatureLoading from './features/FeatureLoading';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <FeatureMonitor />,
      },
      {
        path: '/search',
        element: <FeatureSearch />,
      },
      {
        path: '/checkout',
        element: <FeatureCheckOut />,
      },
      {
        path: '/restaurants/:name',
        element: <FeatureRestaurantMenu />,
      },
      {
        path: '/tastycombos',
        element: <FeatureComboReco />,
      }
    ],
  },
]);

export default function App() {
  return (
    <div className="app">
      <Provider store={rootStore}>
        <FeatureHeader />
        <FeatureMenuBranch />
        <FeaturesDialog />
        <FeatureLoading/>
        <div className='feature-outlet'>
          <Outlet />
        </div>
      </Provider>
    </div>
  );
}
