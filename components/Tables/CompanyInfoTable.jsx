import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import CustomPagination from "./TablePagination";
import { CompanyInfoColumns } from "@/assets/Columns/CompanyInfoColumns";

export default function CompanyInfoTable({
  setID,
  setOpenEditModal,
  setOpenDeleteModal,
  SearchText,
  Rows = [], // Default value to ensure Rows is always an array
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  };

  const filteredRows = Rows.filter((row) => {
    if (SearchText === "") return true;
    return row.name.toLowerCase().startsWith(SearchText.toLowerCase());
  });

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ borderBottomWidth: 2, borderColor: "#465462" }}>
            <TableRow>
              {CompanyInfoColumns.map((vc, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: "bold",
                    paddingBottom: "5px",
                    fontSize: "14px",
                  }}
                  align="center"
                >
                  <div className="text-[14px] pt-[20px] pb-[5px] maxWeb1:pt-[45px] maxWeb1:pb-[6px] maxWeb1:text-[23px] maxWeb2:text-[28px] maxWeb3:text-[34px] maxWeb4:text-[38px] maxWeb2:pt-[70px] maxWeb3:pt-[90px] maxWeb4:pt-[90px] maxWeb2:pb-[12px] maxWeb3:pb-[18px] maxWeb4:pb-[25px]">
                    {vc.title}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      borderBlockWidth: 0,
                    }}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    <div className="flex justify-center items-center gap-x-2">
                      <BiEdit
                        className="text-[1.2rem] maxWeb1:text-[2rem] maxWeb2:text-[2.5rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem] cursor-pointer hover:text-[green] transition-all duration-500"
                        onClick={() => {
                          setID(data._id);
                          setOpenEditModal(true);
                        }}
                      />
                      <RiDeleteBin5Line
                        className="text-[1.2rem] maxWeb1:text-[2rem] maxWeb2:text-[2.5rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem] cursor-pointer hover:text-[red] transition-all duration-500"
                        onClick={() => {
                          setID(data._id);
                          setOpenDeleteModal(true);
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                      {data.name}
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                      {data.contact}
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                      {data.email}
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                      {data.cnic}
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                      {data.desc}
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                      {data.address}
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                      {data.total}
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                      {data.paid}
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                      {data.remaining}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        RowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
