import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const UsersComponent = (props) => {

  console.log(props);

  return <ReactTable data={props.data} columns={props.columns} getTrProps={props.getTrProps}/>;
};

export default UsersComponent;