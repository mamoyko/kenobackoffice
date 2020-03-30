import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../../../partials/content/Portlet";
import { getPlayerById, updatePlayer } from '../../../../crud/player.crud';
import { getBetByPlayer } from '../../../../crud/bet.crud';
import TableModal from '../../../../partials/shared/Modal';
import { Button, CircularProgress,TextField } from '@material-ui/core';
import { Container, InputGroup, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as moment from 'moment'

const PlayerDetailComponent = (props) => {
  const [state, setState] = useState([]);

  const initialInput = {
    _id: '',
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
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
        const response = await getPlayerById(props.match.params.id);
        const betResponse = await getBetByPlayer(response.data.data._id);
        let data = [];
        betResponse.data.map(o => (o.active === true ? data.push(o) : null));
        upPlayer(response.data.data);
        setState({
          columns: [
              { title: 'Transaction id', field: '_id'},
              { title: 'Fullname', field: 'name',
                  render: rowData => `${rowData.player.name.firstName} ${rowData.player.name.lastName}` 
              },
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
  },[]);

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.id]: e.target.value
    });
    // console.log(input)
  };

  const handleSubmitPlayer = async e => {
    e.preventDefault();

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

    try {
      await updatePlayer(obj);
      notify({ success: true, message: 'Success updating business.' });
    } catch (error) {}
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
        currency: data.currency,
        affiliate: data.affiliate,
        street: data.address.street,
        unitNo: data.address.unitNo,
        city: data.address.city,
        province: data.address.province,
        country: data.address.country,
        postalCode: data.address.postalCode
    });
    //setIsModalOpen(true);
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
    <>
    <Container fluid>
      <ToastContainer />
        <Row>
          <Portlet fluidHeight={true}>
            <PortletHeader
              title="Player Details"
              toolbar={
                <PortletHeaderToolbar>
                </PortletHeaderToolbar>
              }
            />
            <PortletBody>
              <div style={{flexDirection:"row",display:"flex"}}>
                 <Col xs={6}>
                  <InputGroup className='mb-4'>
                    <TextField
                    onChange={handleChange}
                    value={input.firstName}
                    id='firstName'
                    type='text'
                    label='First Name'
                    className=''
                    variant='outlined'
                    InputLabelProps={{
                      shrink: true
                    }}
                    size='small'
                    fullWidth={true}
                    required
                  />
              </InputGroup>
          </Col>
                  <Col xs={6}>
                    <InputGroup className='mb-4'>
                        <TextField
                        onChange={handleChange}
                        value={input.middleName}
                        id='middleName'
                        type='text'
                        label='Middle Name'
                        className=''
                        variant='outlined'
                        InputLabelProps={{
                            shrink: true
                        }}
                        size='small'
                        fullWidth={true}
                        required
                        />
                    </InputGroup>
          </Col>
              </div>
              <div style={{flexDirection:"row",display:"flex"}}>
                <Col xs={6}>
                    <InputGroup className='mb-4'>
                        <TextField
                        onChange={handleChange}
                        id='lastName'
                        value={input.lastName}
                        type='text'
                        label='Last Name'
                        className=''
                        variant='outlined'
                        InputLabelProps={{
                            shrink: true
                        }}
                        size='small'
                        fullWidth={true}
                        required
                        />
                    </InputGroup>
                </Col>
                <Col xs={6}>
                    <InputGroup className='mb-4'>
                        <TextField
                        onChange={handleChange}
                        value={input.username}
                        id='username'
                        type='text'
                        label='Username'
                        className=''
                        variant='outlined'
                        InputLabelProps={{
                            shrink: true
                        }}
                        size='small'
                        fullWidth={true}
                        required
                        />
                    </InputGroup>
                </Col>
              </div>
              <div style={{flexDirection:"row",display:"flex"}}>
                <Col xs={6}>
                    <InputGroup className='mb-4'>
                        <TextField
                        onChange={handleChange}
                        value={input.email}
                        id='email'
                        type='text'
                        label='Email'
                        className=''
                        variant='outlined'
                        InputLabelProps={{
                            shrink: true
                        }}
                        size='small'
                        fullWidth={true}
                        required
                        />
                    </InputGroup>
                </Col>
                <Col xs={6}>
                    <InputGroup className='mb-4'>
                        <TextField
                        onChange={handleChange}
                        value={input.phone}
                        id='phone'
                        type='text'
                        label='Phone'
                        className=''
                        variant='outlined'
                        InputLabelProps={{
                            shrink: true
                        }}
                        size='small'
                        fullWidth={true}
                        required
                        />
                    </InputGroup>
                </Col>
              </div>
              <div style={{flexDirection:"row",display:"flex"}}>
                <Col xs={6}>
                    <InputGroup className='mb-4'>
                        <TextField
                        onChange={handleChange}
                        value={input.balance}
                        id='balance'
                        type='text'
                        label='Balance'
                        className=''
                        variant='outlined'
                        InputLabelProps={{
                            shrink: true
                        }}
                        size='small'
                        fullWidth={true}
                        />
                    </InputGroup>
                </Col>
                <Col xs={6}>
                    <InputGroup className='mb-4'>
                        <TextField
                        onChange={handleChange}
                        value={input.currency}
                        id='currency'
                        type='text'
                        label='Currency'
                        className=''
                        variant='outlined'
                        InputLabelProps={{
                            shrink: true
                        }}
                        size='small'
                        fullWidth={true}
                        disabled
                        />
                    </InputGroup>
                </Col>
              </div>
              <div style={{flexDirection:"row",display:"flex"}}>
                <Col xs={12}>
                    <InputGroup className='mb-4'>
                        <TextField
                        onChange={handleChange}
                        value={input.affiliate}
                        id='affiliate'
                        type='text'
                        label='Affiliate'
                        className=''
                        variant='outlined'
                        InputLabelProps={{
                            shrink: true
                        }}
                        size='small'
                        fullWidth={true}
                        />
                    </InputGroup>
                </Col>
              </div>
              <div style={{flexDirection:"row",display:"flex"}}>
                <Col xs={6}>
                <InputGroup className='mb-4'>
                  <TextField
                  onChange={handleChange}
                  value={input.street}
                  id='street'
                  type='text'
                  label='Street'
                  className=''
                  variant='outlined'
                  InputLabelProps={{
                      shrink: true
                  }}
                  size='small'
                  fullWidth={true}
                  />
                </InputGroup>
              </Col>
                <Col xs={6}>
                <InputGroup className='mb-4'>
                  <TextField
                  onChange={handleChange}
                  value={input.unitNo}
                  id='unitNo'
                  type='text'
                  label='Unit No'
                  className=''
                  variant='outlined'
                  InputLabelProps={{
                      shrink: true
                  }}
                  size='small'
                  fullWidth={true}
                  />
                </InputGroup>
              </Col>
              </div>
              <div style={{flexDirection:"row",display:"flex"}}>
                <Col xs={6}>
                <InputGroup className='mb-4'>
                  <TextField
                  onChange={handleChange}
                  value={input.city}
                  id='city'
                  type='text'
                  label='City'
                  className=''
                  variant='outlined'
                  InputLabelProps={{
                      shrink: true
                  }}
                  size='small'
                  fullWidth={true}
                  />
                </InputGroup>
              </Col>
                <Col xs={6}>
                <InputGroup className='mb-4'>
                  <TextField
                  onChange={handleChange}
                  value={input.province}
                  id='province'
                  type='text'
                  label='Province'
                  className=''
                  variant='outlined'
                  InputLabelProps={{
                      shrink: true
                  }}
                  size='small'
                  fullWidth={true}
                  />
                </InputGroup>
              </Col>
              </div>
              <div style={{flexDirection:"row",display:"flex"}}>
                <Col xs={6}>
                <InputGroup className='mb-4'>
                  <TextField
                  onChange={handleChange}
                  value={input.country}
                  id='country'
                  type='text'
                  label='Country'
                  className=''
                  variant='outlined'
                  InputLabelProps={{
                      shrink: true
                  }}
                  size='small'
                  fullWidth={true}
                  />
                </InputGroup>
              </Col>
                <Col xs={6}>
                <InputGroup className='mb-4'>
                  <TextField
                  onChange={handleChange}
                  value={input.postalCode}
                  id='postalCode'
                  type='text'
                  label='PostalCode'
                  className=''

                  variant='outlined'
                  InputLabelProps={{
                      shrink: true
                  }}
                  size='small'
                  fullWidth={true}
                  />
                </InputGroup>
              </Col>
              </div>
              <div style={{flexDirection:"row",display:"flex"}}>
                <Col xs={12}>
                <Button
                    type='button'
                    size='large'
                    className='float-right'
                    variant='contained'
                    color='primary'
                    onClick={handleSubmitPlayer}
                    >
                    Save
                    </Button>
                </Col>
              </div>
            </PortletBody>
          </Portlet>
        </Row>
    </Container>
    <Container fluid>
    {state.data ? (
        <>
          <MaterialTable
            title='Bet Player Records'
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
    </>
  );
};

export default PlayerDetailComponent;
