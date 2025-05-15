import { Outlet } from 'react-router';
import Header from './header';

export default function Layout() {
  return (
    <div className="app-container">
      {<Header />} {/* This renders the header */}
      <main>
        <Outlet /> {/* This renders the child routes */}
      </main>
      {/* Add footer here if needed */}
    </div>
  );
}