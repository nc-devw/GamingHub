import React from 'react';
import { Route } from 'react-router-dom';
import AdminSideBar from '../components/admin_page/admin_side_bar';
import AdminProductList from '../components/admin_page/admin_product_list';
import AdminCategoryForm from '../components/admin_page/admin_category_form';
import AdminProductForm from './../components/admin_page/admin_product_form/index';
import AdminUserForm from './../components/admin_page/admin_user_form/index';
import AdminOrderList from './../components/admin_page/admin_order_list';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../redux/actions/products_actions';
import { getCategories } from './../redux/actions/categories_actions';
import { getOrders } from '../redux/actions/orders_actions';

function AdminRoutes() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.productsReducer.products.productList);
	const categories = useSelector((state) => state.categoriesReducer.categoryList);

	useEffect(() => {
		dispatch(getProducts());
		dispatch(getCategories());
		dispatch(getOrders());
	}, []);

	return (
		<>
			<AdminSideBar />
			<main className="admin-main-container">
				<Route exact path='/admin'>
					<AdminProductList products={products} />
				</Route>

				<Route exact path='/admin/product'>
					<AdminProductForm categories={categories} />
				</Route>

				<Route exact path='/admin/product/:id'>
					<AdminProductForm categories={categories} />
				</Route>

				<Route exact path='/admin/categories' component={AdminCategoryForm} />

				<Route exact path='/admin/user'>
					<AdminUserForm />
				</Route>

				<Route exact path='/admin/user/:id'>
					<AdminUserForm />
				</Route>

				<Route exact path='/admin/orders'>
					<AdminOrderList />
				</Route>

				<Route exact path='/admin/order/:id'>
					{/* <AdminOrderDetail /> */}
				</Route>
			</main>
		</>
	);
}

export default AdminRoutes;