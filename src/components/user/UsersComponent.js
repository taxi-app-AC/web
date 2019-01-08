import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const UsersComponent = (props) => {

  return <ReactTable data={props.data} columns={props.columns} />;
};

export default UsersComponent;