// 測試從資料庫拉資料出來
import React, { useState, useEffect } from 'react';
import { useCart } from '@/hooks/use-cart/use-cart-state';

export default function Products(props) {
  const [products, setProducts] = useState([]);
  // 將商品加入購物車
  // const addProductToCart = (product) => {
  //   // 1. 讀取現有的購物車資料，若不存在則初始化為空陣列
  //   const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
  //   // 2. 檢查商品是否已存在於購物車中（根據商品 ID）
  //   // 如果some()回傳true，表示陣列中有任一元素符合條件
  //   const isProductInCart = existingCart.some((item) => {
  //     console.log('itemID: ' + item.id, 'productID:' + product.ID);
  //     return item.id === product.id;
  //   });

  //   if (isProductInCart) {
  //     // 如果商品已存在，您可以選擇增加數量或提示用戶
  //     alert('此商品已在購物車中！');
  //   } else {
  //     // 如果商品不存在，將其加入購物車
  //     existingCart.push({
  //       id: product.ID,
  //       name: product.Name,
  //       price: product.OriginPrice,
  //       quantity: 1, // 初始數量
  //       // 其他需要的屬性
  //     });

  //     // 3. 將更新後的購物車資料儲存回 localStorage
  //     localStorage.setItem('cart', JSON.stringify(existingCart));
  //   }
  // };
  const {
    cart,
    items,
    addItem,
    removeItem,
    updateItem,
    updateItemQty,
    clearCart,
    isInCart,
    increment,
    decrement,
  } = useCart();
  // 獲得全部商品資料
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/data/aa');
      if (!response.ok) {
        throw new Error('網路回應不成功：' + response.status);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 進入頁面時，取得全部商品資料
  useEffect(() => {
    fetchData();
  }, []);
  // 當使用xxx.map(() => {});需要加上return
  // 如果是用xxx.map(() => ());則不需要加上return
  // 兩種方法可以用，但是當今天需要使用條件判斷時，需要用return
  // 如:
  // const filteredItems = items.map(item => {
  //   if (item.isActive) {
  //     return <ActiveItem key={item.id} {...item} />;
  //   } else {
  //     return <InactiveItem key={item.id} {...item} />;
  //   }
  // });
  return (
    <>
      <div>products</div>
      <ul>
        {products.map((product) => (
          <li key={product.ID}>
            {product.Name} <br />
            {'price: $' + product.OriginPrice}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                addItem({
                  id: product.ID,
                  name: product.Name,
                  price: product.OriginPrice,
                  quantity: 1,
                });
              }}
            >
              加入購物車
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
