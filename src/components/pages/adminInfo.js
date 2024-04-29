import React, { useState } from 'react';
import { db } from '../auth/firebaseConfig';
import { collection, addDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { Box, Button, Modal, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const [newRows, setNewRows] = useState([]);

  const handleAddRow = () => {
    const newRow = { id: Date.now(), administrator: '', call: '', email: '', isNew: true };
    setNewRows([...newRows, newRow]);
  };

  const handleChange = (id, field, value) => {
    const updatedRows = newRows.map(row => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setNewRows(updatedRows);
  };

  const handleSaveData = async () => {
    for (const row of newRows) {
      const docRef = await addDoc(collection(db, "administrators"), {
        administrator: row.administrator,
        call: row.call,
        email: row.email
      });
      console.log("Document written with ID: ", docRef.id);
      row.isNew = false; // Mark as not new after saving
    }
    setRows([...rows, ...newRows]); // Move new rows to regular rows
    setNewRows([]); // Clear new rows
  };

  const handleDelete = async (id) => {
    const docId = String(id);  // id가 숫자일 경우 문자열로 변환
    const docRef = doc(db, "administrators", docId);
  
    // 문서 존재 여부 확인
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      try {
        await deleteDoc(docRef);
        console.log("Document deleted with ID:", docId);
        setRows(rows.filter(row => row.id !== id));
      } catch (error) {
        console.error("Error removing document: ", error);
      }
    } else {
      console.error("Document not found with ID:", docId);
      alert("Document not found or already deleted.");
    }
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
            <Button onClick={handleSaveData} variant="outlined" color="inherit" size="small"><DoneIcon /></Button>
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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...rows, ...newRows].map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.isNew ? (
                      <TextField value={row.administrator} onChange={e => handleChange(row.id, 'administrator', e.target.value)} fullWidth />
                    ) : (
                      row.administrator
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {row.isNew ? (
                      <TextField value={row.call} onChange={e => handleChange(row.id, 'call', e.target.value)} fullWidth />
                    ) : (
                      row.call
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {row.isNew ? (
                      <TextField value={row.email} onChange={e => handleChange(row.id, 'email', e.target.value)} fullWidth />
                    ) : (
                      row.email
                    )}
                  </TableCell>
                  <TableCell align="right"><Button onClick={() => handleDelete(row.id)}><DeleteIcon/></Button></TableCell>
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
