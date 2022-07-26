import React from 'react';
import Table from "../../Components/Table";
import UserMenu from "../../Components/UserMenu";

const UserBookings = () => {
  const data = [
    {id: 1, title: 'Hello world'},
    {id: 2, title: 'Hello world'},
    {id: 3, title: 'Hello world'}
  ];
  window.scrollTo(null, 0);

  return (
    <UserMenu>
      <Table data={data}/>
    </UserMenu>
  );
};

export default UserBookings;