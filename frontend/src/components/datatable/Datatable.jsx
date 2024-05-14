import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import useFetch from '../../hooks/useFetch.js'
import { useEffect, useState } from "react";
import axios from "axios";
import {Columns} from '../../datatablesource.js'

const Datatable = () => {

  const location = useLocation()

  const path = location.pathname.split("/")[1]

  console.log(path)

  const [list, setList] = useState([])

  const { data, loading, error } = useFetch(`/${path}`)

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`)
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

            <Link to={`/${path}/edit/${params.row._id}`} style={{ textDecoration: "none" }}>
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
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>

      <DataGrid
        className="datagrid"
        rows={list}
        columns={Columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row => row._id}
      />
    </div>
  );
};

export default Datatable;
