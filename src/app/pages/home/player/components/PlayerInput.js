import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { Container, InputGroup, Row, Col, Form } from 'react-bootstrap';

const BusinessInput = props => {
  return (
    <Container>
      <form onSubmit={props.handleSubmit}>

            <Row>
                <Col xs={6}>
                    <InputGroup className='mb-4'>
                        <TextField
                        onChange={props.handleChange}
                        id='firstName'
                        type='text'
                        label='First Name'
                        className=''
                        value={props.data.firstName}
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
                        onChange={props.handleChange}
                        id='middleName'
                        type='text'
                        label='Middle Name'
                        className=''
                        value={props.data.middleName}
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
                        onChange={props.handleChange}
                        id='lastName'
                        type='text'
                        label='Last Name'
                        className=''
                        value={props.data.lastName}
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
                        onChange={props.handleChange}
                        id='username'
                        type='text'
                        label='Username'
                        className=''
                        value={props.data.username}
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
                        onChange={props.handleChange}
                        id='email'
                        type='text'
                        label='Email'
                        className=''
                        value={props.data.email}
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
                        onChange={props.handleChange}
                        id='phone'
                        type='text'
                        label='Phone'
                        className=''
                        value={props.data.phone}
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
                        onChange={props.handleChange}
                        id='balance'
                        type='text'
                        label='Balance'
                        className=''
                        value={props.data.balance}
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
                        onChange={props.handleChange}
                        id='currency'
                        type='text'
                        label='Currency'
                        className=''
                        value={props.data.currency}
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
            </Row>
            <Row>
                <Col xs={12}>
                <Button
                    type='submit'
                    size='large'
                    className='float-right'
                    variant='contained'
                    color='primary'
                    >
                    Save
                    </Button>
                </Col>
            </Row>


        {/* <InputGroup className='mb-4'>
          <TextField
            onChange={props.handleChange}
            id='email'
            type='email'
            label='Email'
            className=''
            value={props.data.email}
            variant='outlined'
            InputLabelProps={{
              shrink: true
            }}
            size='small'
            fullWidth={true}
            required
          />
        </InputGroup>
        <InputGroup className='mb-4'>
          <TextField
            onChange={props.handleChange}
            id='firstName'
            label='First name'
            className=''
            value={props.data.firstName}
            variant='outlined'
            fullWidth={true}
            InputLabelProps={{
              shrink: true
            }}
            size='small'
            required
          />
        </InputGroup>

        <InputGroup className='mb-4'>
          <TextField
            onChange={props.handleChange}
            id='lastName'
            label='Last name'
            className=''
            value={props.data.lastName}
            variant='outlined'
            fullWidth={true}
            InputLabelProps={{
              shrink: true
            }}
            size='small'
            required
          />
        </InputGroup>
        <InputGroup className='mb-4'>
          <TextField
            onChange={props.handleChange}
            id='businessName'
            label='Business'
            className=''
            value={props.data.businessName}
            variant='outlined'
            fullWidth={true}
            InputLabelProps={{
              shrink: true
            }}
            size='small'
            required
          />
        </InputGroup>
        <InputGroup> */}
          {/* <Button
            type='submit'
            size='large'
            className='float-right'
            variant='contained'
            color='primary'
          >
            confirm
          </Button>
        </InputGroup> */}
      </form>
    </Container>
  );
};

export default BusinessInput;
