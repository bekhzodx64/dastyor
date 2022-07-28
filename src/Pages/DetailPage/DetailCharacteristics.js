const DetailCharacteristics = ({ features }) => {
	return (
		<table className='detail-page__charac'>
			<tbody>
				{features.length === 0 ? (
					<div>Характеристики не найдены!</div>
				) : (
					features.map((item) => (
						<tr key={item.id}>
							<td>{item.title}</td>
							<td>
								{item.product_details.map((feature) => {
									let index = item.product_details.indexOf(feature)
									let sign = ''
									if (index < item.product_details.length - 1) {
										sign = ','
									}
									return (
										<span key={feature.id}>
											{feature.value}
											{sign} &nbsp;
										</span>
									)
								})}
							</td>
						</tr>
					))
				)}
			</tbody>
		</table>
	)
}

export default DetailCharacteristics
