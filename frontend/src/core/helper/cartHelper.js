export const addToCart = (item, amount) => {
    let cart = [];
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem("cart"))
            const itemExist = cart.find(product => product.id === item.id)
            if (itemExist) {
                for (let i in cart) {
                    if (cart[i].id === item.id) {
                        cart[i].amount += amount;
                        if (cart[i].amount > cart[i].stock) {
                            cart[i].amount = cart[i].stock;
                        }
                        break;
                    }
                }
            }
            if (!itemExist) {
                item.amount = amount
                cart.push({
                    ...item,
                })
            }
        } else {
            item.amount = amount
            cart.push({
                ...item,
            })
        }

        localStorage.setItem('cart',JSON.stringify(cart));
    }
};

export const loadCart = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
}

export const removeFromCart = (product) => {
    let cart = [];
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((item, index) => {
            if (item.id === product.id) {
                cart.splice(index, 1)
            }
        });
        localStorage.setItem("cart", JSON.stringify(cart))
    }
}

export const decrementItemAmount = (product) => {
    let cart = []
    if (typeof window !== undefined) {
        cart = JSON.parse(localStorage.getItem("cart"))
        cart.map((item, index) => {
            if (item.id === product.id) {
                if (item.amount > 1) {
                    item.amount--;
                } else {
                    cart.splice(index, 1)
                }
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    }
}


export const incrementItemAmount = (product) => {
    let cart = []
    if (typeof window !== undefined) {
        cart = JSON.parse(localStorage.getItem("cart"))
        cart.map((item) => {
            if (item.id === product.id) {
                if (item.amount < item.stock) {
                    item.amount++;
                }
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    }
}

export const countTotalPrice = (products) => {
    let totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
        totalPrice += products[i].amount * products[i].price;
    }
    return totalPrice;
}

export const cartEmpty = (next) => {
    if (typeof window !== undefined) {
      localStorage.removeItem("cart");
      let cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
  };
  