import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModalHander = () => {
    setIsModalOpen(true)
  }

  const closeModalHandler = () => {
    setIsModalOpen(false)
  }

  return (
    <CartProvider>
      { isModalOpen && <Cart modalClose={closeModalHandler} />}
      <Header modalShow={showModalHander} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
