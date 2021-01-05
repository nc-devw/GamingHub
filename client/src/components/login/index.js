import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openLogin } from '../../redux/actions/global_actions';
import { FormStyled, Btn, StyledSVG } from '../styles/styled_global';
import { LoginStyled } from '../styles/styled_login';
import CloseButton from '../../assets/img/close-filled-purple.svg';
import strings from './strings';
import { loginUser } from '../../redux/actions/users_actions';

const Login = () => {
	const dispatch = useDispatch();
	const loginIsOpen = useSelector(state => state.globalReducer.loginIsOpen);
	const language = useSelector(state => state.globalReducer.language);
	const theme = useSelector(state => state.globalReducer.theme);

	const [input, setInput] = useState({
		email: '',
		password: ''
	})

	const customStyles = {
		overlay: {
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'rgba(44, 47, 49, 0.95)',
			zIndex: '9999'
		},
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			border: '2px solid #9b5df7',
			borderRadius: '10px',
			boxShadow: '0 0 5px #9b5df7',
			color: theme === 'dark' ? '#F5F4F8' : '#1B1A1F',
			background: theme === 'dark' ? '#2C2F31' : '#F5F4F8',
			WebkitOverflowScrolling: 'touch',
			zIndex: '9999',
		},
	};


	const afterOpenModal = () => {
		document.body.style.overflow = 'hidden';
	}

	const closeModal = () => {
		dispatch(openLogin(false))
		document.body.style.overflow = 'unset';
	}

	const handleChange = (ev) => {
		setInput({
			...input,
			[ev.target.name]: ev.target.value
		})
	}

	const handleSubmit = (ev) => {
		ev.preventDefault()
		dispatch(loginUser(input));
		//FALTA MANEJAR ERRORES
		dispatch(openLogin(false));
	}

	return (
		<Modal
			isOpen={loginIsOpen}
			onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel={'Login'}
			portalClassName={'ReactModalPortal'}
			ariaHideApp={false}
		>
			<LoginStyled theme={theme}>
				<button className='button' onClick={closeModal}><StyledSVG src={CloseButton} /></button>
				<FormStyled onSubmit={handleSubmit}>
					<h2 className='form__title titulo'>{strings[language].title}</h2>
					<label>
						<span>{strings[language].email}</span>
						<input name="email" onChange={handleChange}
							type='email'
							style={{
								color: theme === 'dark' ? '#F5F4F8' : '#1B1A1F',
								background: theme === 'dark' ? '#2C2F31' : '#F5F4F8',
								border: '3px solid var(--clr-primary)'
							}}
							value={input.email}
							required />
					</label>
					<label>
						<span>{strings[language].pass}</span>
						<input name="password" onChange={handleChange}
							type='password'
							style={{
								color: theme === 'dark' ? '#F5F4F8' : '#1B1A1F',
								background: theme === 'dark' ? '#2C2F31' : '#F5F4F8',
								border: '3px solid var(--clr-primary)'
							}}
							value={input.password}
							required />
					</label>
					<div className='link_container' onClick={() => dispatch(openLogin(false))}>
						<Link to="/reset">{strings[language].olvi}</Link>
						<Link to="/signup">{strings[language].create}</Link>
					</div>
					<Btn type='submit' className='btn-ppal'>Ok</Btn>
				</FormStyled>
			</LoginStyled>
		</Modal >
	)
}

export default Login;