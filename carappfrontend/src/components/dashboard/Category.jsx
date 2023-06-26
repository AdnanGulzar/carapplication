import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useGetCategoriesQuery,
  // useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../store/apis/categoryApi";
import React from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

export default function BasicTable() {
  const [create] = useCreateCategoryMutation();
  const [edit] = useUpdateCategoryMutation();
  const [deleteCat] = useDeleteCategoryMutation();
  const [editId, setEditId] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("Create");
  const [catState, setCatState] = React.useState({
    name: "",
  });

  const { data, isError, isLoading } = useGetCategoriesQuery();
  console.log(data);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCatState({ name: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      if (text === "Create") {
        response = await create(catState);
      }
      if (text === "Edit") {
        console.log("edit", editId);

        let catData = catState;
        catData.id = editId;
        response = await edit(catState);
      }
      console.log("resss", response);
      if (response?.data?.success) {
        setCatState({ name: "" });
        handleClose();
        alert("successfully");
      }
      if (response?.error) {
        setCatState({ name: "" });
        handleClose();
        alert(response?.error?.data?.message);
      }
    } catch (error) {
      console.log("eeeee", error);
      setCatState({ name: "" });
      handleClose();
      alert(error?.data?.message);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCatState((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleEdit = (row) => {
    handleClickOpen();
    setEditId(row._id);
    setText("Edit");
    setCatState({
      name: row.name,
    });
    console.log(row);
  };
  const handleDelete = async (id) => {
    const response = await deleteCat(id);
    console.log("res", response);
    if (response?.data?.success) {
      alert("delete success");
    }
  };
  return (
    <>
      {isLoading && <h1>Loading....</h1>}
      {!isError && !isLoading && data && (
        <Box sx={{ width: "1000px" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>name</TableCell>
                  <TableCell align="right">Delete</TableCell>
                  <TableCell align="right">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.category?.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>

                    <TableCell align="right">
                      <Button onClick={() => handleDelete(row._id)}>
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <Button onClick={() => handleEdit(row)}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <Button
        onClick={() => {
          handleClickOpen();
          setText("Create");
        }}
      >
        Create
      </Button>

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{text}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="off"
              autoFocus
              value={catState.name}
              onChange={handleInputChange}
            />

            <DialogActions>
              <Button
                type="submit"
                onClick={() => {
                  handleClose();
                  setCatState({
                    name: "",
                  });
                }}
              >
                Cancel
              </Button>
              <Button type="submit" color="secondary" sx={{width:"200px"}} onClick={handleSubmit}>
                {text}
              </Button>
            </DialogActions>

            <Grid container></Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
