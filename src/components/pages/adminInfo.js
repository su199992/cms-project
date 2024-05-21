import React, { useState, useEffect } from 'react';
import { db } from '../auth/firebaseConfig';
import { collection, addDoc, doc, deleteDoc, updateDoc, getDocs } from 'firebase/firestore';
import { Modal, List, ListItem, ListItemText, ListItemAvatar, Avatar, Box, Typography, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


const modalStyle = {
  position: 'relative',
  top: '50%',
  left: '50%',
  //transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  p: 4,
};

const AdminInfoModal = ({ open, onClose }) => {
  const [rows, setRows] = useState([]);
  const [newRows, setNewRows] = useState([]);
  const [editMode, setEditMode] = useState(null);  // 현재 수정 중인 항목의 ID 저장

  useEffect(() => {
    fetchData();  // 컴포넌트 로드 시 데이터 불러오기
  }, []);

  // Firestore에서 데이터 불러오기를 위한 함수
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "adminInfo"));
    const fetchedRows = [];
    querySnapshot.forEach((doc) => {
      fetchedRows.push({ ...doc.data(), id: doc.id, isNew: false });
    });
    setRows(fetchedRows);
  };

  const handleInfoAdd = () => {
    const newRow = { id: Date.now(), name: '', info: '', isNew: true };
    setNewRows([...newRows, newRow]); // 새로운 행 추가
    setEditMode(null); // 기존 편집 모드가 있다면 종료
  };

  const handleInfoChange = (id, field, value) => {
    const updatedRows = newRows.map(row => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setNewRows(updatedRows);
  };

  // Firestore에 데이터 저장 및 자동 리로드
  const handleSaveToFirestore = async () => {
    for (const row of newRows) {
      await addDoc(collection(db, "adminInfo"), {
        name: row.name,
        info: row.info
      });
    }
    await fetchData();  // 저장 후 데이터 리로드
    setNewRows([]);  // 입력 필드 초기화
  };

  // 수정 모드 활성화 및 기존 데이터 로드
  const handleInfoEdit = (id) => {
    const selectedRow = rows.find(row => row.id === id) || newRows.find(row => row.id === id);
    setEditMode(selectedRow);
  };

  // 수정된 데이터를 Firestore에 저장
  const handleUpdateToFirestore = async () => {
    if (editMode) {
      const docRef = doc(db, "adminInfo", editMode.id);
      await updateDoc(docRef, {
        name: editMode.name,
        info: editMode.info
      });
      setEditMode(null);  // 수정 모드 종료
      fetchData();  // 데이터 업데이트 후 새로 불러오기
    }
  };
  const handleInfoDelete = async (id) => {
    await deleteDoc(doc(db, "adminInfo", id));
    await fetchData();  // 삭제 후 데이터 리로드
  };

  const handleInfoClose = () => {
    setNewRows([]);  // 입력 정보 초기화
    onClose();  // 모달 닫기
  };

  return (
    <Modal
      open={open}
      onClose={handleInfoClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{ invisible: true }}
      sx={modalStyle}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
          <Box sx={{display: "flex"}}>
          <Typography variant='h5'>담당자 정보</Typography>
          <Button onClick={handleInfoAdd} color="inherit" size="small"><AddIcon /></Button>
          </Box>
          <Box>
            <Button onClick={handleInfoClose} color="inherit" size="small"><CloseIcon /></Button>
          </Box>
        </Box>
        <Box>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {[...rows, ...newRows].map((row) => (
            <ListItem key={row.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{row.name && row.name.length > 0 ? row.name[0].toUpperCase() : '?'}</Avatar>
              </ListItemAvatar>
              {(editMode && editMode.id === row.id) || row.isNew ? (
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <Box>
                  <TextField 
                    value={row.isNew ? row.name : editMode.name} 
                    onChange={e => row.isNew ? handleInfoChange(row.id, 'name', e.target.value) : setEditMode({...editMode, name: e.target.value})}
                    placeholder='담당자 이름' 
                    fullWidth 
                    variant="standard" 
                    size='small'
                  />
                  <TextField 
                    value={row.isNew ? row.info : editMode.info} 
                    onChange={e => row.isNew ? handleInfoChange(row.id, 'info', e.target.value) : setEditMode({...editMode, info: e.target.value})}
                    placeholder='내선번호 / 이메일' 
                    fullWidth 
                    variant="standard" 
                  />
                  </Box>
                  <Button onClick={row.isNew ? handleSaveToFirestore : () => handleUpdateToFirestore()} color="inherit" size="small">
                    <CheckOutlinedIcon />
                  </Button>
                </Box>
              ) : (
                <>
                  <ListItemText 
                    primary={<span>{row.name}</span>} 
                    secondary={<span>{row.info}</span>}
                  />
                  { !row.isNew && (
                    <Button onClick={() => handleInfoEdit(row.id, row.name, row.info)}><EditOutlinedIcon /></Button>
                  )}
                  { !row.isNew && (
                    <Button onClick={() => handleInfoDelete(row.id)}>
                      <DeleteIcon/>
                    </Button>
                  )}
                </>
              )}
            </ListItem>
          ))}
        </List>
        </Box>
      </Box>
    </Modal>
  );
};

export default AdminInfoModal;
