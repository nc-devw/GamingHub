import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

/* --- Components --- */
import Catalog from '../catalog'

/* --- Actions --- */
import { getFilterProducts, getProducts, emptyFilter } from '../../redux/actions/products_actions'

/* --- Utils --- */
import strings from './strings';
import SelectCategories from '../select_categories'
import arrowUp from '../../assets/img/arrow-up.svg';

/* --- Styles --- */
import { StyledSVG } from '../styles/styled_global';
import { changeCurrentPage, resetCurrentPage } from '../../redux/actions/global_actions';
import { animateScroll } from 'react-scroll';


export const getProductsPayload = { name: 'stock', order: 'DESC', limit: 8 };

const HomePage = () => {

	const dispatch = useDispatch();
	const language = useSelector(state => state.globalReducer.language);
	const s = strings[language];
	const { productList: products, isLoading: loadingProducts, error: errorProducts } = useSelector(state => state.productsReducer.products);
	const { productList: productsFilter, isLoading: loadingProductsFilter, filter } = useSelector(state => state.productsReducer.productsFilter);
	const categories = useSelector(state => state.categoriesReducer.categories.list);

	const scrollButton = useRef();
	const mainHeader = useRef();

	const limitPerPage = 8;

	const handleSelect = (e) => {
		dispatch(resetCurrentPage())
		if (e.target.value === 'todos') {
			dispatch(emptyFilter())
			return dispatch(getProducts(getProductsPayload))
		}
		dispatch(getFilterProducts(e.target.value, { limit: 8 }));
	}

	window.onscroll = function () { scrollFunction() };
	const scrollDistance = 700;

	function scrollFunction() {
		if (scrollButton.current) {
			if (document.body.scrollTop > scrollDistance || document.documentElement.scrollTop > scrollDistance) {
				scrollButton.current.style.pointerEvents = 'auto';
				scrollButton.current.style.opacity = '100';
			} else {
				scrollButton.current.style.pointerEvents = 'none';
				scrollButton.current.style.opacity = '0';
			}
		}
	}
	const scrollToTop = () => {
		animateScroll.scrollToTop();
	}

	const handlePageChange = (ev) => {
		const offset = ev.selected !== 0 ? limitPerPage * ev.selected : 0;
		dispatch(changeCurrentPage(ev.selected));
		if (productsFilter) {
			dispatch(getFilterProducts(filter, { limit: limitPerPage, offset }))
		} else {
			dispatch(getProducts({ name: 'stock', order: 'DESC', limit: limitPerPage, offset }))
		}
		mainHeader.current.scrollIntoView({ block: 'start', behavior: 'smooth' })
	}
	return (
		<div ref={mainHeader}>
			<h1 className="main-title">{s.main_header}</h1>
			<SelectCategories language={language} categories={categories} handleSelect={handleSelect} />
			<Catalog products={productsFilter ? productsFilter : products}
				language={language}
				isLoading={loadingProductsFilter || loadingProducts}
				error={errorProducts}
				handlePageChange={handlePageChange}
			/>
			<button ref={scrollButton} className="button__top" onClick={scrollToTop}>
				<StyledSVG src={arrowUp} />
			</button>
		</div>
	)
}

export default HomePage;
