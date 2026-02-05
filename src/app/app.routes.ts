import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SellerAuth } from './seller-auth/seller-auth';
import { SellerHome } from './seller-home/seller-home';
import { authGuard } from './auth-guard';
import { SellerAddProduct } from './seller-add-product/seller-add-product';
import { SellerUpdateProduct } from './seller-update-product/seller-update-product';
import { Search } from './search/search';
import { ProductDetail } from './product-detail/product-detail';
import { UserAuth } from './user-auth/user-auth';
import { CartPage } from './cart-page/cart-page';
import { Checkout } from './checkout/checkout';
import path from 'path';
import { YourOrders } from './your-orders/your-orders';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'seller-auth',
        component: SellerAuth
    },
    {
        path: 'seller-home',
        component: SellerHome,
        canActivate: [authGuard]
    },
    {
        path:'seller-add-product',
        component:SellerAddProduct,
        canActivate:[authGuard]
    },
     {
        path:'seller-update-product/:id',
        component:SellerUpdateProduct,
        canActivate:[authGuard]
    },
    {
        path: 'search/:query',
        component:Search    
    },
    {
        path:"product-detail-page/:productId",
        component:ProductDetail
    },
    {
        path:"user-auth",
        component:UserAuth
    },
    {
        path:"MyCart",
        component:CartPage
    },
    {
        path:"Checkout",
        component:Checkout
    },
      {
        path:"Your-orders",
        component:YourOrders
    }
    

];
