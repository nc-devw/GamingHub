import styled from 'styled-components';

export const ProductCardStyled = styled.article`
	font-family: Poppins, sans-serif;
	font-size: 1.2em;
	border: 3px solid #9b5df7;
	width: 250px;
	border-radius: 10px;
	background: var(--clr-white);
	overflow: hidden;
	box-shadow: 5px 5px 0px #9b5df7;
	color: var(--clr-black);
	position: relative;
	transition: all 0.1s ease-in-out;
	margin: 0 0.5rem 1rem;
	height: 400px;

	&:hover,
	&:focus-within {
		transform: translate(5px, 5px);
		box-shadow: none;
	}

	.card__link {
		color: transparent;
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
	}

	.card__imgContainer {
		width: 100%;
		height: 50%;
	}

	.card__img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		filter: grayscale(50%);
		transition: filter 0.2s ease;
	}

	&:hover .card__img {
		filter: grayscale(100%);
	}

	.card__content {
		padding: 0.5em 1em;
		height: 50%;
	}

	.card__title {
		font-size: 1.2em;
		color: #9b5df7;
	}

	@supports (background-clip: text) {
		.card__title {
			color: transparent;
			background: linear-gradient(-90deg, #5630e4, #9b5df7);
			background-clip: text;
		}
	}

	.card__price {
		font-size: 1.2em;
		font-weight: 900;
		position: relative;
	}

	.card__price::before {
		content: '';
		background: #9b5df7;
		display: block;
		width: 20%;
		height: 5px;
		margin: 0.5em 0;
	}

	.card__sale::after {
		content: 'oferta';
		font-size: 0.5em;
		font-weight: 400;
		text-transform: uppercase;
		background: #5630e4;
		padding: 0.2em 0.5em;
		margin-left: 0.5em;
		border-radius: 99em;
		color: white;
		position: absolute;
		bottom: 0.5em;
	}

	.card__platforms {
		margin-top: 1rem;
		list-style: none;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.card__platform {
		flex: 0 0 25px;
		margin: 0 0.6em;
	}

	.card__platform img {
		width: 100%;
		height: 100%;
	}
`;
