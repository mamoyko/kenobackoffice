import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import { getPlayer, addPlayer, updatePlayer, deletePlayer } from '../../../../crud/player.crud';
import TableModal from '../../../../partials/shared/Modal';
import { Button, CircularProgress } from '@material-ui/core';
import PlayerInput from './PlayerInput';
import { Row, Col, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlayerViewComponent = () => {
  const [state, setState] = useState(0);
  
  const initialInput = {
    _id: '',
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    balance: '',
    currency: 'USD',
    affiliate: '',
    street: '',
    unitNo: '',
    city: '',
    province: '',
    country: '',
    postalCode: ''
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [input, setInput] = useState(initialInput);
  const [reRender, setRerender] = useState(false); // Re render table after updating

  const notify = data => {
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
    const response = await getPlayer();
    let data = [];
    response.data.data.map(o => (o.active === true ? data.push(o) : null));
    setState({
        columns: [
            { title: 'First name', field: 'name',
                render: rowData => rowData.name.firstName
            },
            { title: 'Last name', field: 'name',
              render: rowData => rowData.name.lastName
            },
            { title: 'Email', field: 'email' },
            { title: 'Phone', field: 'phone' },
            { title: 'Balance', field: 'balance' },
            { title: 'Currency', field: 'currency' },
          {
            title: 'Action',
            field: 'actions',
            width: 200,
            render: data => {
              return (
                <Row>
                  <Col>
                  <Link to={`/players/${data._id}`}>
                    <Button
                      variant='contained'
                      color='secondary'
                      title={data._id}
                    >
                      Details
                    </Button>
                    </Link>
                  </Col>
                  <Col>
                    <Button
                      variant='contained'
                      onClick={() => delPlayer(data._id)}
                    >
                      DELETE
                    </Button>
                  </Col>
                </Row>
              );
            }
          }
        ],
        data: data
      });
    };
    fetchData();
  }, [reRender]);

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmitBusiness = async e => {
    e.preventDefault();

    let obj = {
      _id: input._id,
      name: {
          firstName: input.firstName,
          middleName: input.middleName,
          lastName: input.lastName
      },
      email: input.email,
      password: input.password,
      username: input.username,
      phone: input.phone,
      balance: input.balance,
      currency: input.currency,
      affiliate : input.affiliate,
      address: {
        street: input.street,
        unitNo: input.unitNo,
        city: input.city,
        province: input.province,
        country: input.country,
        postalCode: input.postalCode
      }
  }

    if (isUpdate) {
      try {
        await updatePlayer(obj);
        notify({ success: true, message: 'Success updating player.' });
      } catch (error) {}
    }
    if (!isUpdate) {
      try {
        delete obj._id
        await addPlayer(obj);
        notify({ success: true, message: 'Success adding player.' });
      } catch (error) {}
    }
    setIsModalOpen(false);
    setRerender(!reRender);
  };

  const upPlayer = data => {
    setInput({
        _id : data._id,
        firstName: data.name.firstName,
        middleName: data.name.middleName,
        lastName: data.name.lastName,
        email: data.email,
        username: data.username,
        password: data.password,
        phone: data.phone,
        balance: data.balance,
        currency: data.currency,
        affiliate: data.affiliate,
        street: data.address.street,
        unitNo: data.address.unitNo,
        city: data.address.city,
        province: data.address.province,
        country: data.address.country,
        postalCode: data.address.postalCode
    });
    // setIsModalOpen(true);
    setRerender(!reRender);
  };

  const delPlayer = async id => {
    await deletePlayer(id);
    notify({ success: false, message: 'deleted player.' });
    setRerender(!reRender);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container fluid>
      <ToastContainer />

      <TableModal
        type='player'
        title='Player'
        open={isModalOpen}
        handleClose={closeModal}
      >
        <PlayerInput
          data={input}
          handleChange={handleChange}
          handleSubmit={handleSubmitBusiness}
        />
      </TableModal>

    

      {state.data ? (
        <>
          <Button
            className='mb-2'
            variant='contained'
            color='primary'
            size='large'
            onClick={() => {
              setIsModalOpen(true);
              setIsUpdate(false);
              setInput(initialInput);
            }}
          >
            Add
          </Button>
          <MaterialTable
            title='Business'
            columns={state.columns}
            data={state.data}
          />
        </>
      ) : (
        <div align='center'>
          <CircularProgress />
        </div>
      )}
    </Container>
  );
};

export default PlayerViewComponent;
