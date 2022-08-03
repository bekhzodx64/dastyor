import Table from '../../Components/Table'
import UserMenu from '../../Components/UserMenu'

const UserBookings = () => {
	const data = [
		{ id: 1, title: 'Hello world' },
		{ id: 2, title: 'Hello world' },
		{ id: 3, title: 'Hello world' },
	]

	return (
		<UserMenu>
			<Table data={data} />
		</UserMenu>
	)
}

export default UserBookings
