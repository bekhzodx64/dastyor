import Table from '../../Components/Table'
import UserMenu from '../../Components/UserMenu'

import { useSelector } from 'react-redux'

const UserBookings = () => {
	const data = [
		{ id: 1, title: 'Hello world' },
		{ id: 2, title: 'Hello world' },
		{ id: 3, title: 'Hello world' },
	]

	const { first_name } = useSelector((state) => state.userReducer)

	return (
		<UserMenu first_name={first_name}>
			<Table data={data} />
		</UserMenu>
	)
}

export default UserBookings
