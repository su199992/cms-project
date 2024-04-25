import * as React from 'react';
import {Box,Button,Typography,Modal,Table,TableBody,TableCell,TableContainer,TableRow,Paper} from '@mui/material'; //TableHead

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

const rows = [
  { administrator: '포팅Unit', call: '', email: 'ld_pt@hunet.co.kr' },
  { administrator: '고봉석 Unit장', call: '070-5210-4752', email: 'bongseok@hunet.co.kr' },
  { administrator: '조성용 책임', call:'070-5210-4758', email: 'pranaria@hunet.co.kr' },
  { administrator: '송수정 사원', call: '', email: 'song1992@hunet.co.kr' }
];

const AdminInfoModal = ({open, onClose}) => {

  return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ invisible: true }}
      >
        <Box sx={modalStyle}>
          <Box sx={{display:'flex', justifyContent: 'space-between', marginBottom: 3}}>
            <Typography id="modal-modal-title" variant="h6" component="h2">담당자 정보</Typography>
            <Button onClick={onClose} variant="outlined" color="inherit" size="small">닫기</Button>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ Width: '100%' }} size="small" aria-label="a dense table">
              {/* <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{width:'25%'}}>담당자</TableCell>
                  <TableCell align="left" sx={{width:'35%'}}>번호</TableCell>
                  <TableCell align="left" sx={{width:'40%'}}>이메일</TableCell>
                </TableRow>
              </TableHead> */}
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.administrator}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.administrator}
                    </TableCell>
                    <TableCell align="left">{row.call}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
  );
}

export default AdminInfoModal;
