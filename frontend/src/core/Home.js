import React, {useState, useEffect} from 'react'
import { getAllProducts, getAllCategories } from './helper/productHelper';
import Base from './Base';
import Card from './Card';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sliderValue, setSliderValue] = useState(100);
    const [topPrice, setTopPrice] = useState(0)

    useEffect(() => {
        loadAllCategories();
        loadAllProducts();
        setLoading(false);
    }, [])
    useEffect(() => {
        highestPrice(products)
    }, [products])

    useEffect(() => {
        setSliderValue(topPrice)
    }, [topPrice])

    const handleSearchBar = (e) => {
        setSearch(e.target.value)
    }

    const handleSlider = (e) => {
        setSliderValue(e.target.value)
    }

    const handleCheckbox = (category) => {
        let tempCategory = category
        if (tempCategory.active === true) {
            tempCategory.active = false;
        } else {
            tempCategory.active = true;
        }
        const tmpIdx = categories.findIndex(x => x.id === tempCategory.id);
        setCategories([
             ...categories.slice(0,tmpIdx), 
             tempCategory,
             ...categories.slice(tmpIdx+1), 
        ]);
    }
    
    const checkForCategory = (product) => {
        for (let i = 0; i < categories.length; i++) {
            if (product.category === categories[i].id && categories[i].active === true) {
                return true;
            }
        }
    }

    const loadAllProducts = () => {
        getAllProducts()
        .then((data) => {
            if (data.error) {
                setError(true);
                console.log(data.error);
                console.log(data)
            } else {
                setProducts(data);
            }
        })
        .catch((error) => console.log(error));
    };

    const loadAllCategories = () => {
        getAllCategories()
        .then((data) => {
            setCategories(data);
        })
        .catch((error) => console.log(error));
    }

    const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
    && product.price <= sliderValue
    && checkForCategory(product)
    )

    const highestPrice = (products) => {
        let currentTopPrice = 0
        for (let i = 0; i < products.length; i++) {
            if (products[i].price > currentTopPrice) {
                currentTopPrice = products[i].price;
            }
            setTopPrice(currentTopPrice);
        }
    }
    return (
        <Base title="Home Page">
            {loading && <h1>Loading...</h1>}
            {!loading && (
    
                <div className="row">
                    <div className="col-3">
                        <div className="search-settings">

                            <form>
                                <input onChange={handleSearchBar} type="text" placeholder="Search..." className="searchbar"></input>
                                <hr/>
                                <div className="checkboxes">
                                    <p style={{textAlign:'center'}}>Categories:</p>
                                    {categories.map((category) => {
                                        return (
                                            <>
                                                <input type="checkbox" onClick={() => handleCheckbox(category)} defaultChecked={category.active} key={category.name} />
                                                <label style={{marginLeft:"5px"}} htmlFor={category.name}>{category.name}</label><br/>
                                            </>
                                        )
                                    })}
                                </div>
                                <hr/>
                                <div className="price-range">
                                    <label htmlFor="slider">Price range: 0 - {sliderValue}$</label><br/>
                                    <input onChange={handleSlider} id="slider" value={sliderValue} type="range" min="1" max={topPrice}/>
                                        
                                </div>

                            </form>
                        </div>

                    </div>

                    <div className="col-9">
                        <div className="card-container">
                            {error && <h1>Something went wrong... Try again later or contact us directly.</h1>}
                            {!filteredProducts.length && <h1 style={{textAlign:'center'}}>No matching products...</h1>}
                            {!error && (
                                filteredProducts.map((product) => {
                                    return (
                                        <Card key={product.id} product={product}/>
                                    )
                                })
                            )}
                        </div>
                    </div>

                </div>
            )}
        </Base>
    )
}

export default Home;