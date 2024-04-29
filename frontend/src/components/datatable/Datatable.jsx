import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import useFetch from '../../hooks/useFetch.js'
import { useEffect, useState } from "react";
import axios from "axios";

const Datatable = ({ columns }) => {


  const [list, setList] = useState([])

  const { data, loading, error } = useFetch(`/users`)

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`)
      setList(list.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    setList(data)
  }, [data])


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {

        return (

          <div className="cellAction">

            <Link to={`/users/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>

            <Link to={`/users/edit/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>

            <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</div>

          </div>
        );
      },
    },
  ];


  return (
    <div className="datatable">

      <div className="datatableTitle">
        Add New
        <Link to={`/users/new`} className="link">
          Add New
        </Link>
      </div>

      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row => row._id}
      />
    </div>
  );
};

export default Datatable;
