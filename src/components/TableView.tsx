import React from 'react';
import MaterialTable, { Column } from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import {MessageEntity} from "../api/MessageEntity";
import Typography from '@material-ui/core/Typography';
import InfoDialog from "./InfoDialog";


export interface Props{
  data:MessageEntity[],
  deleteAction:Function
}

export default function TableView(props: Props) {
  const handleDeleteRecord = (oldData:MessageEntity|MessageEntity[]) => {
    props.deleteAction(oldData);
  };

  const [openDetail, setOpenDetail] = React.useState(false);
  const [record, setRecord] = React.useState<MessageEntity>({id:0,message:"",link:""});


  const handleOpenDetail = (record:MessageEntity|MessageEntity[]) => {
    setOpenDetail(true);
    setRecord(record as MessageEntity);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  return (
    <div>
      <MaterialTable
        title="Message list"
        columns={[
          {
            width: 100,
            title: 'ID',
            field: 'id',
            render: rowData =>
              <div >
                <Typography noWrap>{rowData.id}</Typography>
              </div>
          },
          {
            title: 'Message',
            field: 'message',
            render: rowData =>
              <div>
                <Typography noWrap>{rowData.message}</Typography>
              </div>
          },
        ]}
        data={props.data}
        actions={[
          {
            icon: () => <VisibilityIcon/>,
            tooltip: 'View Message',
            onClick: (event, rowData) => handleOpenDetail(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Message',
            onClick: (event, rowData) => { if (confirm("You want to delete message ")) handleDeleteRecord(rowData) }
          }
        ]}
        options={{
          search: false,
          sorting: false,
          draggable: false,
          tableLayout:"fixed",
          rowStyle: {
            backgroundColor: '#EEE'
          }
        }}
      />
      <InfoDialog handleClose = {handleCloseDetail} open = {openDetail} record={record}/>
    </div>

  )
}
