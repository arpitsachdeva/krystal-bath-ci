document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('#recent-products');
    const apiUrl = 'https://krystalbath.cilearningschool.com/fetch-products-and-shop-info'; // Update URL for production
  
    if (productsContainer) {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const products = data.products || [];
          let currency = data.shop.currency || 'USD'; // Fallback to USD if currency not available
  
          let productsHtml = '';
  
          products.forEach(product => {
            const image = product.images[0]?.src || '';
            const title = product.title || 'No title available';
            const variant = product.variants[0];
            const price = variant?.price || 'Price not available';
            const compare_at_price = variant?.compare_at_price || 'Price not available';
            const handle = product.handle || '';
            if (currency = 'INR') {
                currency = "₹";
            }

            let discount;
            discount = Math.round(100*(compare_at_price - price)/(compare_at_price));
  
            productsHtml += `
            
                <div class="col-lg-3 col-md-6">
                
                
            
                <div class="main_block">
                <div class="main_img">
                  <span><img src="${image}" alt="h_img1" class="img-fluid w-100 "></span>
                  <div class="main_btn">
                     <a href="#" class="site_btn w-100 text-center add-to-cart" data-variant-id="${variant.id}">ADD TO CART</a>
                  </div>
                </div>
                <div class="main_caption">
                  <div class="rating_sec d-flex align-items-center">
                    <span>4.5</span>
                    <a href="#">20 Reviews</a>
                  </div>
                  <h4><a href="/products/${handle}">${title}</a></h4>
                  <div class="main_price d-flex align-items-center">
                    <div class="price_inline">
                      <p> ${currency} ${price} <span>INR ${compare_at_price}</span></p>
                      <div class="it_sec">Inclusive of all taxes</div>
                    </div>
                    <div class="discount_sec">
                      <p>${discount}% OFF</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
          });
  
          productsContainer.innerHTML = productsHtml;

          // Add event listener for "Add to Cart" buttons
          const addToCartButtons = document.querySelectorAll('.add-to-cart');
          addToCartButtons.forEach(button => {
              button.addEventListener('click', (event) => {
                  event.preventDefault();
                  const variantId = button.getAttribute('data-variant-id');
                  fetch('/cart/add.js', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          'Accept': 'application/json'
                      },
                      body: JSON.stringify({
                          id: variantId,
                          quantity: 1
                      })
                  })
                  .then(response => response.json())
                  .then(() => {
                      // Redirect to cart page after adding item to cart
                      window.location.href = '/cart';
                  })
                  .catch(error => {
                      console.error('Error adding product to cart:', error);
                  });
              });
          });


        })
        .catch(error => {
          console.error('Error fetching products and shop info:', error);
          productsContainer.innerHTML = '<p>Sorry, there was an error loading products.</p>';
        });
    }
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const collections = [
      { id: 'bestsellers-products', name: 'Bestsellers' },
      { id: 'faucets-products', name: 'Faucets' },
      { id: 'showers-products', name: 'Showers' },
      { id: 'favourites-products', name: 'Favourites' },
      { id: 'kitchen-sinks-products', name: 'Kitchen Sinks' },
    ];
  
    collections.forEach(collection => {
      const container = document.querySelector(`#${collection.id}`);
      const apiUrl = `https://krystalbath.cilearningschool.com/fetch-collection-products-and-shop-info/${encodeURIComponent(collection.name)}`; // Update URL for production
  
      if (container) {
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            const products = data.products || [];
            let currency = data.shop.currency || 'USD'; // Fallback to USD if currency not available
            let productsHtml = '';
  
            products.forEach(product => {
              // Safeguard against missing data
              const image = product.images[0]?.src || '';
              const title = product.title || 'No title available';
              const variant = product.variants[0];
              const price = variant?.price || 'Price not available';
              const compare_at_price = variant?.compare_at_price || 'Price not available';
              const handle = product.handle || '';

              if (currency === 'INR') {
                currency = "₹";
              }
  
              // Safeguard against missing compare_at_price
              let discount = 'N/A';
              if (price && compare_at_price && compare_at_price > 0) {
                discount = Math.round(100 * (parseFloat(compare_at_price) - parseFloat(price)) / parseFloat(compare_at_price));
              }
  
              productsHtml += `
                <div class="col-lg-3 col-md-6">
                  <div class="main_block">
                    <div class="main_img">
                      <span><img src="${image}" alt="${title}" class="img-fluid w-100"></span>
                      <div class="main_btn">
                        <a href="#" class="site_btn w-100 text-center add-to-cart" data-variant-id="${variant?.id}">ADD TO CART</a>
                      </div>
                    </div>
                    <div class="main_caption">
                      <div class="rating_sec d-flex align-items-center">
                        <span>4.5</span>
                        <a href="#">20 Reviews</a>
                      </div>
                      <h4><a href="/products/${handle}">${title}</a></h4>
                      <div class="main_price d-flex align-items-center">
                        <div class="price_inline">
                          <p>${currency} ${price} <span>${currency} ${compare_at_price}</span></p>
                          <div class="it_sec">Inclusive of all taxes</div>
                        </div>
                        <div class="discount_sec">
                          <p>${discount}% OFF</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            });
  
            container.innerHTML = productsHtml;
  
            // Add event listener for "Add to Cart" buttons
            const addToCartButtons = container.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
              button.addEventListener('click', (event) => {
                event.preventDefault();
                const variantId = button.getAttribute('data-variant-id');
                fetch('/cart/add.js', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify({
                    id: variantId,
                    quantity: 1
                  })
                })
                .then(response => response.json())
                .then(() => {
                  // Redirect to cart page after adding item to cart
                  window.location.href = '/cart';
                })
                .catch(error => {
                  console.error('Error adding product to cart:', error);
                });
              });
            });
  
          })
          .catch(error => {
            console.error(`Error fetching products for ${collection.name}:`, error);
            container.innerHTML = '<p>Sorry, there was an error loading products.</p>';
          });
      }
    });
  });
  

  document.addEventListener('DOMContentLoaded', () => {

    //UPDATING JAVASCRIPT AGAIN
    // Get the current URL path (e.g., "/collections/kitchen-essentials")
    const currentPath = window.location.pathname;

    // Extract the collection name from the URL path (e.g., "kitchen-essentials")
    const collectionName = currentPath.split('/collections/')[1];

    // Mapping between collection URL names and their display names
    const collectionMapping = {
      'bathroom-essentials': 'Bathroom',
      'kitchen-sinks': 'Kitchen Sinks',
      'faucets': 'Faucets',
      'showers': 'Showers',
      'favourites': 'Favourites',
      'bestsellers': 'Bestsellers'
      // Add other mappings as needed
    };

    if(collectionMapping[collectionName] != 'Bathroom'){
      document.getElementById("heading_for").innerHTML = `${collectionMapping[collectionName]}`
    }
    
    // Update the collections array with the correct name
    const collections = [
      { id: 'bathroom', name: collectionMapping[collectionName] }
    ];

    collections.forEach(collection => {
      const container = document.querySelector(`#${collection.id}`);
      const apiUrl = `https://krystalbath.cilearningschool.com/fetch-collection-products-and-shop-info/${encodeURIComponent(collection.name)}`; // Update URL for production
  
      if (container) {

        // Show the loader before fetching data
        loader.style.display = 'flex';

        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            const products = data.products || [];
            let currency = data.shop.currency || 'USD'; // Fallback to USD if currency not available
            let productsHtml = '';
  
            products.forEach(product => {
              // Safeguard against missing data
              const image = product.images[0]?.src || '';
              const title = product.title || 'No title available';
              const description = product.body_html || 'No description available';
              const variant = product.variants[0];
              const price = variant?.price || 'Price not available';
              const compare_at_price = variant?.compare_at_price || 'Price not available';
              const handle = product.handle || '';

              if (currency === 'INR') {
                currency = "₹";
              }
  
              // Safeguard against missing compare_at_price
              let discount = 'N/A';
              if (price && compare_at_price && compare_at_price > 0) {
                discount = Math.round(100 * (parseFloat(compare_at_price) - parseFloat(price)) / parseFloat(compare_at_price));
              }
  
              productsHtml += `
                <div class="col-lg-4 col-md-6 mar_btm">
                  <div class="main_block">
                      <div class="main_img">
                          <span><img src="${image}" alt="h_img1" class="img-fluid w-100 "></span>
                          <div class="main_btn">
                              <a href="#" class="site_btn w-100 text-center add-to-cart" data-variant-id="${variant?.id}">ADD TO CART</a>
                          </div>
                      </div>
                      <div class="main_caption">
                          <h4>
                              <a href="/products/${handle}">${title}</a>
                              <span>${description}</span>
                          </h4>
                          <p class="crystal_id">562IN-SD-VS</p>
                          <div class="main_price d-flex align-items-center">
                              <div class="price_inline">
                                  <p>${currency} ${price} <span>${currency} ${compare_at_price}</span></p>
                                  <div class="it_sec">Inclusive of all taxes</div>
                              </div>
                              <div class="discount_sec">
                                  <p>${discount}% OFF</p>
                              </div>
                          </div>
                      </div>
                  </div>
                </div> 
              `;
            });
  
            // Hide the loader and show the products
            loader.style.display = 'none';
            container.innerHTML = productsHtml;
  
            // Add event listener for "Add to Cart" buttons
            const addToCartButtons = container.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
              button.addEventListener('click', (event) => {
                event.preventDefault();
                const variantId = button.getAttribute('data-variant-id');
                fetch('/cart/add.js', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify({
                    id: variantId,
                    quantity: 1
                  })
                })
                .then(response => response.json())
                .then(() => {
                  // Redirect to cart page after adding item to cart
                  window.location.href = '/cart';
                })
                .catch(error => {
                  console.error('Error adding product to cart:', error);
                });
              });
            });
  
          })
          .catch(error => {
            console.error(`Error fetching products for ${collection.name}:`, error);
            container.innerHTML = '<p>Sorry, there was an error loading products.</p>';
          });
      }
    });
  });
