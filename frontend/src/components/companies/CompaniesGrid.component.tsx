import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { ICompany } from "../../types/global.typing";
import "./companies-grid.scss";

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "size", headerName: "size", width: 150 },
  {
    field: "createdAt",
    headerName: "creationTime",
    width: 200,
    renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD"),
  },
];


interface IcompaniesGridProps{
    data: ICompany[];
}


const CompaniesGrid = ({data}:IcompaniesGridProps) => {
  return (
    <Box sx={{width:"100%",height:450}} className="companies-grid">
      <DataGrid rows={data} columns={column} getRowId={(row)=>row.id} rowHeight={50} />
    </Box>
  );
};

export default CompaniesGrid;
