const DetailDescription = ({ descriptions }) => {
	return (
		<>
			{descriptions?.map((item, index) => (
				<article className='detail-page__description' key={index}>
					{item.description}
				</article>
			))}
		</>
	)
}

export default DetailDescription
