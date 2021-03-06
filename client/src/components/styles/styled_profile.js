import styled from 'styled-components';

export const ProfileStyled = styled.div`

	text-align: center;
	flex: 1;
	padding: 2em;
	.img-container{
		margin: 0 auto 1em;
		width: 300px;
		height: 300px;
		border-radius: 50%;
		border: 10px solid rgba(118, 63, 199, .6);
		overflow: hidden;
		img{
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	h2{
		font-size: 3em;
	}
	p{
		text-align: center;
	}


	@media (max-width: 450px) {
		 .img-container {
			
		width: 150px;
		height: 150px;
		 }
	h2{
		font-size: 2em;
	}
	  }
`