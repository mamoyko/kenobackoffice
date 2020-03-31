import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { getPlayer } from '../../../../crud/player.crud';
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

const AffiliateViewComponent = () => {
  const [state, setState] = useState(0);
  const [reRender, setRerender] = useState(false); // Re render table after updating
  
  useEffect(() => {
    const fetchData = async () => {
    const response = await getPlayer();
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
            { title: 'Currency', field: 'currency' },
            {
                title: 'Action',
                field: 'actions',
                width: 200,
                render: data => {
                  return (
                    <Row>
                      <Col>
                      <Link to={`/affiliate/${data.affiliate}`}>
                        <Button
                          variant='contained'
                          color='secondary'
                          title={data._id}
                        >
                          Details
                        </Button>
                        </Link>
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


  const getLeadSource = id => {
    const lead = leads.find(item => item.id === parseInt(id));
    return lead.leadSourceName;
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
