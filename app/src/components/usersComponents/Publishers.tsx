import { Nav, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { IUser } from '../../shared/interfaces';
import { Link } from 'react-router-dom';
import { config } from '../../constants';
import { useUserContext } from '../../contexts/UserContext';

const Publishers = (): JSX.Element => {
  const { currentUser } = useUserContext();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`${config.url.API_URL}/congregations/${currentUser!.congregation.id}/users`)
      .then((r) => {
        if (!r.ok) {
          throw r;
        }
        return r.json();
      })
      .then((d) => {
        setUsers(d);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentUser!.congregation.id]);

  const userRows = users.map((user: IUser) => {
    return (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
      </tr>
    );
  });

  return (
    <div id="manage-publishers">
      <h1>Manage Publishers</h1>
      <p>
        This page can be used to create new accounts or manage existing accounts for publishers in
        your congregation. Publishers with accounts can use them to access their territories online.
      </p>
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>{userRows}</tbody>
      </Table>
      <Link className="btn btn-primary" to="/create_user">
        Add Publisher
      </Link>
    </div>
  );
};

export default Publishers;
