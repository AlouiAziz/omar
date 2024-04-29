// User Columns
export const userColumns = [

  { field: "_id", headerName: "ID", width: 150 },
  {
    field: "user",
    headerName: "Email",
    width: 300,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row?.img || "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="} alt="avatar" />
          {params.row.email}
        </div>
      );
    },
  },
  {
    field: "nom",
    headerName: "Nom",
    width: 100,
  },
  {
    field: "prenom",
    headerName: "Prenom",
    width: 100,
  },
  {
    field: "privilege",
    headerName: "Privilége",
    width: 120,
  },
];

