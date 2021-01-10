import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addProduct, getProduct, editProduct, deleteImage } from '../../../redux/actions/products_actions'

import { Btn, CheckboxLabel, FormStyled } from '../../styles/styled_global'
import { Redirect, useParams } from 'react-router-dom';

import { storage } from '../../../firebase/';
import { useToasts } from 'react-toast-notifications';
import Swal from 'sweetalert2';
import strings from './strings';

const AdminProductForm = ({ categories }) => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const language = useSelector(state => state.globalReducer.language);
	const s = strings[language];

	const [imagesAsFile, setImagesAsFile] = useState([]);

	const product = useSelector((state) => state.productsReducer.productDetail.product);
	const isLoading = useSelector((state) => state.productsReducer.productDetail.isLoading);

	const [toAdmin, setToAdmin] = useState(false);
	const { addToast } = useToasts();

	const fileInput = useRef(null);



	let [input, setInput] = useState({
		name: '',
		description_es: '',
		description_en: '',
		price: 1,
		img: [],
		is_active: true,
		categories: {}
	});

	useEffect(() => {
		if (input.img.length === imagesAsFile.length && input.img.length > 0) {
			id ? dispatch(editProduct(input)) : dispatch(addProduct(input));
			addToast(id ? s.toastProductEdited : s.toastProductAdded, { appearance: 'success' })
			setToAdmin(true);
		}
	}, [input.img]);

	useEffect(() => {
		if (id) dispatch(getProduct(id));
	}, []);

	useEffect(() => {
		if (id && Object.keys(product).length) {
			const newCategories = product.categories.reduce((acc, cat) => {
				acc[cat.id] = true;
				return acc;
			}, {});

			setInput({
				id: product.id,
				name: product.name,
				description_es: product.description_es,
				description_en: product.description_en,
				price: product.price,
				img: [],
				is_active: product.is_active,
				categories: newCategories
			})
		}
	}, [product]);

	const handleInput = (ev) => {
		ev.persist();
		if (ev.target.name === 'is_active') {
			setInput(prevState => ({
				...prevState,
				is_active: !prevState.is_active
			}))
		} else {
			setInput(prevState => ({
				...prevState,
				[ev.target.name]: ev.target.value
			}))
		}
	}

	const handleImagesAsFile = (e) => {
		const images = [...e.target.files];
		let invalidFile = images.some(img => !img.type.includes('image'));
		let invalidSize = images.some(img => img.size > 2097152);
		if (invalidFile) {
			Swal.fire({
				heightAuto: false,
				title: s.invalidImgFile,
				icon: 'warning',
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'Ok',
			})
			fileInput.current.value = '';
			return;
		}
		if (invalidSize) {
			Swal.fire({
				heightAuto: false,
				title: s.invalidImgSize,
				icon: 'warning',
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'Ok',
			})
			fileInput.current.value = '';
			return;
		}
		setImagesAsFile(imageFile => (images));
	}

	const handleCategories = (ev) => {
		ev.persist();
		setInput(prevState => ({
			...prevState,
			categories: {
				...prevState.categories,
				[ev.target.value]: !prevState.categories[ev.target.value]
			}
		}))
	}
	const handleSubmit = (ev) => {
		ev.preventDefault();

		if (id && !imagesAsFile.length) {
			dispatch(editProduct(input));
			addToast(s.toastProductEdited, { appearance: 'success' })
			return setToAdmin(true);
		};

		imagesAsFile.map(imageAsFile => {

			if (imageAsFile === '') {
				console.error(`Not an image. That file is a ${typeof (imageAsFile)}`)
			}
			const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
			uploadTask.on('state_changed',
				(snapShot) => { },
				(err) => { },
				() => {
					storage.ref('images').child(imageAsFile.name).getDownloadURL()
						.then(fireBaseUrl => {
							setInput(prev => ({
								...prev,
								img: [...prev.img, fireBaseUrl]
							}))
						})
				})
		})
	}

	const opciones = id ? s.titleEdit : s.titleAdd;

	const swalDeleteImg = {
		heightAuto: false,
		title: s.swDeleteTitle,
		text: s.swDeleteText,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: s.swDeleteConfirmButton,
		cancelButtonText: s.swDeleteCancelButton
	};

	if (isLoading) return <h1 className="admin-h1"><i class="fas fa-circle-notch fa-spin"></i> {s.loading}</h1>;
	if (toAdmin) return <Redirect to='/admin' />

	return (
		<>
			<h1 className='admin-h1'>{opciones}</h1>
			<FormStyled method='post' onSubmit={handleSubmit} autoComplete='off'>
				<div className='flex-form-container'>
					<div>
						<label>
							<span>{s.inputName}</span>
							<input type='text' name='name' value={input.name} onChange={handleInput} required />
						</label>
						<label>
							<span>{s.inputDescES}</span>
							<textarea type='text' name='description_es' value={input.description_es} onChange={handleInput} required>
							</textarea>
						</label>
						<label>
							<span>{s.inputDescEN}</span>
							<textarea type='text' name='description_en' value={input.description_en} onChange={handleInput} required>
							</textarea>
						</label>
					</div>

					<div>
						<label>
							<span>{s.inputPrice}</span>
							<input type='number' step='0.01' name='price' value={input.price} onChange={handleInput} required />
						</label>
						<label>
							<span>{s.inputImage}</span>
							<input ref={fileInput} type='file' name='img' onChange={handleImagesAsFile} multiple required={id ? false : true} />
						</label>
						<br />
						<div className='image__container'>
							{id && product.images?.length > 0 &&
								product.images.map(image =>
									<div className='image_thumbnail'>
										<span className='delete__image'>{s.inputDeleteImage}</span>
										<img src={image.url} width='100px' key={image.id} onClick={() => {
											Swal.fire(swalDeleteImg).then((result) => {
												if (result.isConfirmed) {
													Swal.fire(
														s.swConfirmTitle,
														s.swConfirmText,
														'success',
														dispatch(deleteImage(image))
													)
												}
											})
										}} />
									</div>
								)}
						</div>
						<br />
						<br />
						<CheckboxLabel className='no-shadow check' checked={input.is_active}>
							<input
								type='checkbox'
								value={input.is_active}
								onChange={handleInput}
								name='is_active'
							/>
							<span className='no-shadow'>{s.inputActive}</span>
						</CheckboxLabel>
						<span className='form__categorias'>{s.categories}</span>
						<ul>
							{
								categories.map(cat => {
									return (
										<li key={cat.id}>
											<CheckboxLabel className='no-shadow check' checked={input.categories[cat.id]}>
												<input
													type='checkbox'
													name={cat.name_es}
													value={cat.id}
													onChange={handleCategories}
												/>
												<span className='no-shadow'>{cat.name_es}</span>
											</CheckboxLabel>
										</li>
									)
								})
							}
						</ul>
						<Btn type='submit' className='btn-ppal'>{opciones}</Btn>
					</div>
				</div>
			</FormStyled>
		</>

	);
};

export default AdminProductForm;