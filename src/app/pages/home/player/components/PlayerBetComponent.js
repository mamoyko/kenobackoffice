import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { getBetByPlayer } from '../../../../crud/bet.crud';
import * as moment from 'moment'

const PlayerBetComponent = (props) => {
  const [state, setState] = useState(0);

  let player_id = props.id;

  const [reRender, setRerender] = useState(false); // Re render table after updating

  useEffect(() => {
    const fetchData = async () => {
    const response = await getBetByPlayer(player_id);
    let data = [];
    response.data.map(o => (o.active === true ? data.push(o) : null));
    setState({
      columns: [
        { title: 'Transaction id', field: 'transaction_id'},
        { title: 'Player name', field: 'player',
            render: rowData => `${rowData.player.name.firstName} ${rowData.player.name.lastName}`
        },
        { title: 'Bet Amount', field: 'betAmount'},
        { title: 'Win Amount', field: 'draw',
          render: rowData => `${rowData.draw.reward}`
        },
        { title: 'Bet Table', field: 'draw',
            render: rowData => rowData.draw.keno_played.map((item) => `${item} `)
        },
        { title: 'Table Results', field: 'draw',
          render: rowData => rowData.draw.keno_played.map((item) => `${item} `)
        },
        { title: 'Hit Count', field: 'draw',
            render: rowData => rowData.draw.hit_count
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

  return (
      <>
        {state.data && (
            <>
            <MaterialTable
                title='Player Bet Details'
                columns={state.columns}
                data={state.data}
            />
            </>
        )}
      </>
  );
};

export default PlayerBetComponent;
