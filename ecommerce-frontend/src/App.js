import logo from './logo.svg';
import './App.css';
import { useState, useEffect} from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try{
        const categoriesResponse = await fetch("http://localhost:1337/api/categories");
        const productsResponse = await fetch("http://localhost:1337/api/products");
        const ordersResponse = await fetch("http://localhost:1337/api/orders");

        const categoriesData = await categoriesResponse.json();
        const productsData = await productsResponse.json();
        const ordersData = await ordersResponse.json();

        setCategories(categoriesData.data);
        setProducts(productsData.data);
        setOrders(ordersData.data);
      }catch(error) {
        setError(error);
      }
      setIsLoading(false)
    };
    fetchData()
  }, [])


  function createOrder(){
    const cartMenu = document.querySelector("#cart-menu")
    const selectBox = document.querySelector("#select-box")
    let listElement = document.createElement('li').classList.add('nav-link')

    listElement = selectBox.value
    cartMenu.innerHTML += "<li className='nav-link'> <h3> " + listElement + " </h3> </li>"
  }

  function removeList(){
    const cartMenu = document.querySelector("#cart-menu")
    cartMenu.innerHTML = ""
  }


  if(isLoading) return <h1>Loading...</h1>
  if(error) return <h1>Error: {error.message}</h1>;

  return(
    <div className='App'>
    <header className='nav-menu'>
    <div className='nav-item'>
      <h2>Categories</h2>
      <ul className='dropdown-content'>
        {categories.map(category => (
          <li className='nav-link' key={category.id}>
            <h2>{category.attributes.name}</h2>
            <code>{category.attributes.products}</code>
          </li>
        ))}
      </ul>
    </div>
    
    <div className='nav-item'>
       <h2>Products</h2>
        <ul className='dropdown-content'>
          {products.map(product => (
            <li className='nav-link' key={product.id}>
              <h2>{product.attributes.name}</h2>
            </li>
          ))}
        </ul>
    </div>

    <div className='nav-item'>
      <h2>Orders</h2>
      <ul className='dropdown-content'>
        {orders.map(order => (
          <li className='nav-link' key={order.id}>
            <h2>{order.attributes.date}</h2>
            <code>{order.attributes.delivered}</code>
          </li>
        ))}
      </ul>
    </div>

    <div className='cart-div nav-item'>
      <h2>Cart</h2>
      <ul id='cart-menu' className='dropdown-content'>

      </ul>
    </div>
    </header>
    <section className='hero-section'>
      <select name='Produtcts' id='select-box'>
        <option value="" disabled selected>Select your order</option>
        {products.map(product => (
          <option>{product.attributes.name}</option>
        ))}
      </select>


      <button onClick={createOrder}>Create Order</button>
      <button onClick={removeList}>Clear the Cart</button>
    </section>
    </div>
    
  )


  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Categories
        </h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  */
}

export default App;
