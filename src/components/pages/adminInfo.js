import React, { useState } from 'react';
import { Box, Button, Typography, Modal, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 570,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 4,
};

const AdminInfoModal = ({ open, onClose }) => {
  const [rows, setRows] = useState([]);

  const handleAddRow = () => {
    const newRow = { id: rows.length, administrator: '', call: '', email: '' };
    setRows([...rows, newRow]);
  };

  const handleChange = (index, field, value) => {
    const newRows = rows.map((row, idx) => {
      if (idx === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{ invisible: true }}
    >
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', marginBottom: 3, justifyContent: 'space-between' }}>
          <Box>
            <Button onClick={handleAddRow} variant="outlined" color="inherit" size="small"><AddIcon /></Button>
            <Button variant="outlined" color="inherit" size="small"><DoneIcon /></Button>
          </Box>
          <Box>
            <Button onClick={onClose} variant="outlined" color="inherit" size="small"><CloseIcon /></Button>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">담당자</TableCell>
                <TableCell align="left">번호</TableCell>
                <TableCell align="left">이메일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <TextField value={row.administrator} onChange={e => handleChange(index, 'administrator', e.target.value)} fullWidth />
                  </TableCell>
                  <TableCell align="left">
                    <TextField value={row.call} onChange={e => handleChange(index, 'call', e.target.value)} fullWidth />
                  </TableCell>
                  <TableCell align="left">
                    <TextField value={row.email} onChange={e => handleChange(index, 'email', e.target.value)} fullWidth />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default AdminInfoModal;
