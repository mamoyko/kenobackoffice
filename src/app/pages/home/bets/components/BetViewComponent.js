import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { getBet } from '../../../../crud/bet.crud';
import TableModal from '../../../../partials/shared/Modal';
import { Button, CircularProgress } from '@material-ui/core';
// import PlayerInput from './PlayerInput';
import { Row, Col, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as moment from 'moment'

const BetViewComponent = () => {
  const [state, setState] = useState(0);

  const initialInput = {
    _id: '',
    playerName: '',
    balance: '',
    betAmount: '',
    WinAmount: '',
    LoseAmount: '',
    betTable: '',
    data: ''
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
    const response = await getBet();
    let data = [];
    response.data.data.map(o => (o.active === true ? data.push(o) : null));
    setState({
        columns: [
            { title: 'Transaction id', field: '_id'},
            { title: 'Player name', field: 'player',
                render: rowData => `${rowData.player.name.firstName} ${rowData.player.name.lastName}`
            },
            { title: 'Balance', field: 'playerBalance'},
            { title: 'Bet Amount', field: 'betAmount'},
            { title: 'Win Amount', field: 'WinAmount'},
            { title: 'Lose Amount', field: 'LoseAmount'},
            { title: 'Bet Table', field: 'betTable',
                render: rowData => rowData.betTable.map((item) => `${item} `)
            },
            { title: 'Table Results', field: 'tableResults',
              render: rowData => rowData.tableResults.map((item) => `${item} `)
            },
            { title: 'Date', field: 'date_created',
              render: rowData => moment(rowData.date_created).format('LLLL')
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
    if (isUpdate) {
      try {
        let obj = {
            _id: input._id,
            name: {
                firstName: input.firstName,
                middleName: input.middleName,
                lastName: input.lastName
            },
            email: input.email,
            username: input.username,
            phone: input.phone,
            balance: input.balance,
            currency: input.currency
        };
        // await updatePlayer(obj);
        notify({ success: true, message: 'Success updating business.' });
      } catch (error) {}
    }
    if (!isUpdate) {
      try {
        let obj = {
            name: {
                firstName: input.firstName,
                middleName: input.middleName,
                lastName: input.lastName
            },
            email: input.email,
            username: input.username,
            phone: input.phone,
            balance: input.balance,
            currency: input.currency
        };
        // await addPlayer(obj);
        notify({ success: true, message: 'Success adding business.' });
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
        phone: data.phone,
        balance: data.balance,
        currency: data.currency
    });
    setIsModalOpen(true);
    setRerender(!reRender);
  };

  const delPlayer = async id => {
    // await deletePlayer(id);
    setRerender(!reRender);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container fluid>
      <ToastContainer />

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

export default BetViewComponent;
