import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { getPlayerByAffiliate } from '../../../../crud/player.crud';
import { Button, CircularProgress } from '@material-ui/core';
import { Container, Row, Col } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const leads = [
    {
      "id": 1,
      "leadSourceName": "Lead 1",
      "leadStatusName": "Lead 1"
    },
    {
        "id": 2,
        "leadSourceName": "Lead 2",
        "leadStatusName": "Lead 2"
    },
    {
        "id": 3,
        "leadSourceName": "Lead 3",
        "leadStatusName": "Lead 3"
    },
    {
        "id": 4,
        "leadSourceName": "Lead 4",
        "leadStatusName": "Lead 5"
    }
];

const AffiliateViewComponent = (props) => {
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
    const response = await getPlayerByAffiliate(props.match.params.id);
    let data = [];
    response.data.data.map(o => (o.active === true ? data.push(o) : null));
    setState({
        columns: [
            { title: 'Affiliate', field: 'affiliate',
                render: rowData => getLeadSource(rowData.affiliate)
            },
            { title: 'First name', field: 'name',
                render: rowData => rowData.name.firstName
            },
            { title: 'Last name', field: 'name',
                render: rowData => rowData.name.lastName
            },
            { title: 'Balance', field: 'balance' },
            { title: 'Currency', field: 'currency' },
            { title: 'Currency', field: 'currency' }
            ],
        data: data
      });
    };
    fetchData();
  }, [reRender]);


  const getLeadSource = id => {
    const lead = leads.find(item => item.id === parseInt(id));
    return lead.leadSourceName;
  };

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

export default AffiliateViewComponent;
