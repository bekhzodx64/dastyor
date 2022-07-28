import React, { useState } from 'react'
import { postComment } from '../../Repository/ProductsApi'

const DetailModal = ({ modal, setModal, stars, product }) => {
	const [review, setReview] = useState({
		term: '',
		rating: 0,
	})

	function commentItem(e) {
		e.preventDefault()
		const body = {
			product: product.id,
			text: review.term,
			rating: review.rating,
		}
		postComment(body)
			.then(() => {
				setModal(false)
				setReview(() => {
					return {
						term: '',
						rating: 0,
					}
				})
			})
			.catch((err) => console.log(err))
	}

	return (
		<>
			{modal ? (
				<div className='detail-page__review'>
					<div className='review__wrapper'>
						<div className='detail-page__review-close'>
							<svg
								onClick={() => {
									setModal(false)
									setReview(() => {
										return {
											term: '',
											rating: 0,
										}
									})
								}}
								width='48'
								height='48'
								viewBox='0 0 48 48'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M38 38H10V10H38V38ZM6 6V42H42V6H6ZM34 31.18L31.18 34L24 26.82L16.82 34L14 31.18L21.18 24L14 16.82L16.82 14L24 21.18L31.18 14L34 16.82L26.82 24L34 31.18Z'
									fill='#C1C8CE'
								/>
							</svg>
						</div>
						<form onSubmit={commentItem}>
							<textarea
								name='comment'
								maxLength={400}
								onChange={(e) => {
									setReview((state) => {
										return {
											...state,
											term: e.target.value,
										}
									})
								}}
								required={true}
								value={review.term}
							/>
							<span>{review.term.length}/400</span>
							<div className='review__rating'>
								<div>
									{stars.map((item, index) => (
										<i
											key={index}
											onMouseEnter={() =>
												setReview((state) => {
													return {
														...state,
														rating: index + 1,
													}
												})
											}
											className={
												index < review.rating
													? 'review__star active'
													: 'review__star'
											}
										>
											{item}
										</i>
									))}
								</div>
								<button disabled={review.rating === 0}>Готово</button>
							</div>
						</form>
					</div>
				</div>
			) : null}
		</>
	)
}

export default DetailModal
