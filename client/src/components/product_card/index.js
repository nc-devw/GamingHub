import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCardStyled } from '../styles/styled_product_card';
import { Btn } from '../styles/styled_global'
import { IMAGE_NOT_FOUND } from '../../utils/constants';

const ProductCard = ({ game }) => {
	return (
		<ProductCardStyled>
			<Link to={`/products/${game.id}`} className="card__link">Clic para ver al producto</Link>
			<div className="card__imgContainer">
				<img className="card__img" src={game.images[0] ? game.images[0].url : IMAGE_NOT_FOUND} alt={game.name} />
			</div>
			<div className="card__content">
				<h3 className="card__title">
					{
						game.name.length > 33 ? game.name.substring(0, 30) + '...' : (game.name)
					}
				</h3>
				<p className="card__price">$ {game.price}</p>
				<Btn className="btn-ppal">Agregar al carrito</Btn>
			</div>
		</ProductCardStyled>)
};

// ProductCard.defaultProps = {
// 	id: 1,
// 	name: 'Final Fantasy VII Remake',
// 	price: 52.38,
// 	is_active: true,
// 	image: "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-20/common/buy/fifapre20-standard-pc.jpg"
// };

export default ProductCard;
