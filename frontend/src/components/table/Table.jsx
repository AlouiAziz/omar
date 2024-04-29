import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from '../../hooks/useFetch.js'

const TableView = ({ id }) => {

  const { data, loading, error } = useFetch(`/users`)

  const rows = ['ID', 'Email', 'Nom', 'Prenom', 'Privilége'];

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {rows.map((row, index) => (<TableCell key={index} className="tableCell">{row}</TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="tableCell">{user?._id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src="https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg=" alt="" className="image" />
                  {user?.email}
                </div>
              </TableCell>
              <TableCell className="tableCell">{user?.nom}</TableCell>
              <TableCell className="tableCell">{user?.prenom}</TableCell>
              <TableCell className="tableCell">{user?.privilege}</TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default TableView;
