import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Menu } from './pages/Menu';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Checkout } from './pages/Checkout';
import { CartProvider } from './context/CartContext';

const Root = () => (
  <CartProvider>
    <Layout />
  </CartProvider>
);

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'menu', Component: Menu },
      { path: 'gallery', Component: Gallery },
      { path: 'contact', Component: Contact },
      { path: 'checkout', Component: Checkout },
    ],
  },
]);
