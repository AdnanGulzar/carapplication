import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  useGetCarsQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} from "../../store/apis/carApi";
import {
  useGetCategoriesQuery,
} from "../../store/apis/categoryApi";
import React from "react";

export default function BasicTable() {
  const { data:categories} = useGetCategoriesQuery();
  console.log("cate",categories);
  const [create] = useCreateCarMutation();
  const [edit] = useUpdateCarMutation();
  const [deleteCar] = useDeleteCarMutation();
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("Create");
  const [editId, setEditId] = React.useState(null);
  const [carState, setCarState] = React.useState({
    name: "",
    category: "",
    price: 0,
    model: "",
    color: "",
  });
  const { data, isError, isLoading } = useGetCarsQuery();
  console.log(data);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCarState({ name: "", category: "", price: 0, model: "", color: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      if (text === "Create") {
        response = await create(carState);
      }
      if (text === "Edit") {
        let carData = carState;
        carData.id = editId;
        response = await edit(carData);
      }

      console.log(response);
      if (response?.data?.success) {
        setCarState({ name: "", category: "", price: 0, model: "", color: "" });
        handleClose();
        alert("successfully");
      }
      if (response?.error) {
        setCarState({ name: "", category: "", price: 0, model: "", color: "" });
        handleClose();
        alert(response?.error?.data?.message);
      }
    } catch (error) {
      console.log(error);
      alert(error?.data?.message);

      // Handle login error
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarState((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleEdit = (row) => {
    handleClickOpen();
    setEditId(row._id);
    setText("Edit");
    setCarState({
      name: row.name,
      category: row.category,
      price: row.price,
      model: row.model,
      color: row.color,
    });
  };
  const handleDelete = async (id) => {
    const response = await deleteCar(id);
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
                  <TableCell align="right">Color</TableCell>
                  <TableCell align="right">Model</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Delete</TableCell>
                  <TableCell align="right">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.cars?.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.color}</TableCell>
                    <TableCell align="right">{row.model}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.category}</TableCell>
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
              value={carState.name}
              onChange={handleInputChange}
            />

            <Select
              margin="normal"
              required
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={carState.category}
              label="category"
              name="category"
              onChange={handleInputChange}
            >
             {
              categories?.category?.map((item)=> <MenuItem value={item.name} key={item._id}>{item.name} </MenuItem>
              )
             }
             
              
            </Select>

            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Price"
              name="price"
              type="number"
              autoComplete="off"
              value={carState.price}
              onChange={handleInputChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="model"
              label="Model"
              name="model"
              autoComplete="off"
              value={carState.model}
              onChange={handleInputChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="color"
              label="Color"
              name="color"
              autoComplete="off"
              value={carState.color}
              onChange={handleInputChange}
            />
            <DialogActions>
              <Button
                type="submit"
                onClick={() => {
                  handleClose();
                  setCarState({
                    name: "",
                    category: "",
                    price: 0,
                    model: "",
                    color: "",
                  });
                }}
              >
                Cancel
              </Button>
              <Button type="submit" onClick={handleSubmit}>
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
