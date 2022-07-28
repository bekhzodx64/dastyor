import './Table.css'

const Table = ({ data }) => {
	return (
		<div className='table'>
			<table>
				<tbody>
					<tr>
						<td>Товар</td>
						<td>Дата</td>
						<td>Статус</td>
						<td>Общая сумма</td>
					</tr>
					{data.map((item) => (
						<tr key={item.id}>
							<td>{item.title}</td>
							<td>{item.title}</td>
							<td>{item.title}</td>
							<td>{item.title}</td>
						</tr>
					))}
				</tbody>
			</table>
			<button className='table__button'>Показать ещё</button>
		</div>
	)
}

export default Table
