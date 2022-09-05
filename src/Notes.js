import {
  Button,
  //   Card,
  CardActions,
  CardContent,
  Modal,
  OutlinedInput,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { Context } from "./App";
import { data } from "./data";
const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};
export const EditContext = React.createContext();
export const Notes = () => {
  function generateRandomColor() {
    // let maxVal = 0xf0f0f0;
    // let randomNumber = Math.random() * maxVal;
    // randomNumber = Math.floor(randomNumber);
    // console.log(randomNumber);
    // randomNumber = randomNumber.toString(16);
    // console.log(randomNumber);
    // let randColor = randomNumber.padStart(6, 0);
    // var r = parseInt(randColor.substr(1, 2), 16);
    // var g = parseInt(randColor.substr(3, 2), 16);
    // var b = parseInt(randColor.substr(4, 2), 16);
    // var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    // Return new color if to dark, else return the original
    // return (yiq > 40) ? randColor.toUpperCase() : "#fff";
    // return `#${randColor.toUpperCase()}`;
    // function getRandomColor() {
    return (
      "rgb(" +
      (Math.floor(Math.random() * 156) + 100) +
      ", " +
      (Math.floor(Math.random() * 156) + 100) +
      ", " +
      (Math.floor(Math.random() * 156) + 100) +
      ")"
    );
    //   }
  }
  const [, setLogged] = useContext(Context);

  const [open, setOpen] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [title, settitle] = React.useState("");

  const [category, setcategory] = React.useState("");
  const [deleteE, setdelete] = useState(false);
  const [search, setsearch] = useState("");

  const [text, settext] = React.useState("");
  const clickhandler = () => {
    if (title === "") setErr("Title can't be empty");
    else if (category === "") setErr("Category can't be empty");
    else if (text === "") setErr("Enter something before saving");
    else {
      var newPost = {
        id: data.length + 1,
        title: title,
        category: category,
        text: text,
      };
      data.push(newPost);
      alert("Sucessfully saved!");
      setOpen(false);
      settext("");
      settitle("");
      setcategory("");
    }
  };
  function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const processChange = debounce((e) => saveInput(e));

  const saveInput = (e) => {
    setsearch(e.target.value);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    settext("");
    settitle("");
    setcategory("");
  };
  var flag = 0;
  return (
    <>
      <div className="notes">
        <div className="Navbar">
          <div>Notes.in</div>
          {/* <div>Categories</div> */}
          <div>
            <input
              onChange={processChange}
              // value={search}
              placeholder="Find notes"
            />
          </div>
          <div>
            <Tooltip
              title={
                <span
                  style={{
                    fontSize: "14px",
                    backgroundColor: "#",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Logout
                </span>
              }
            >
              <span>
                <i
                  class="fa fa-sign-out"
                  aria-hidden="true"
                  onClick={() => setLogged(0)}
                ></i>
              </span>
            </Tooltip>
          </div>
        </div>
        {data.length !== 0 ? (
          <>
            {" "}
            <EditContext.Provider
              value={[
                open,
                setOpen,
                err,
                setErr,
                title,
                settitle,
                category,
                setcategory,
                text,
                settext,
                deleteE,
                setdelete,
              ]}
            >
              {search === "" ? (
                <>
                  <div className="main">
                    {data.map((item, index) => (
                      <>
                        <Card
                          header={item.title}
                          title={item.category}
                          text={item.text}
                          id={item.id}
                          color={generateRandomColor()}
                        />
                      </>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="main">
                    {data.map((item, index) => (
                      <>
                        {item.title
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        item.category
                          .toLowerCase()
                          .includes(search.toLowerCase()) ? (
                          <>
                            <span style={{ display: "none" }}>
                              {(flag = 1)}
                            </span>
                            <Card
                              header={item.title}
                              title={item.category}
                              text={item.text}
                              id={item.id}
                              color={generateRandomColor()}
                            />
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ))}

                    {flag === 0 ? (
                      <>
                        <h4>No notes found!</h4>
                        <Button onClick={() => setsearch("")}>Show All</Button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              )}
            </EditContext.Provider>
          </>
        ) : (
          <>
            <h2>Currently no notes added by you!!</h2>
            <br />
            <button
              style={{
                backgroundColor: "rgb(245, 19, 38)",
                color: "#fff",
                border: "none",
                height: "50px",
                borderRadius: "5%",
              }}
              onClick={() => setOpen(true)}
            >
              Add your 1st Note
            </button>
          </>
        )}

        <Tooltip
          title={
            <span
              style={{
                fontSize: "14px",
                backgroundColor: "#",
                color: "#fff",
                border: "none",
              }}
            >
              Add a Note!
            </span>
          }
        >
          <span
            id="post"
            onClick={() => {
              setOpen(true);
            }}
          >
            <i class="fa fa-plus-circle" aria-hidden="true"></i>
          </span>
        </Tooltip>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ position: "relative" }}
          // sx={{display:{xs:'none',sm:'flex',md:"flex",lg:"flex"}}}
        >
          <Box sx={style}>
            <h3>New Note</h3>

            <OutlinedInput
              placeholder="Title"
              sx={{ m: 2 }}
              //   type=""
              onChange={(e) => {
                settitle(e.target.value);
                setErr("");
              }}
              value={title}
            />
            <OutlinedInput
              placeholder="Category"
              sx={{ m: 2 }}
              //   type="Category"
              onChange={(e) => {
                setcategory(e.target.value);
                setErr("");
              }}
              value={category}
            />
            <TextField
              id="outlined-multiline-static"
              //   label="Multiline"
              multiline
              rows={4}
              placeholder="Type your text here.."
              //   width="200%"
              sx={{ m: 2 }}
              onChange={(e) => {
                settext(e.target.value);
                setErr("");
              }}
              value={text}
            />

            <br />
            <Button
              variant="contained"
              color="success"
              sx={{ m: 2 }}
              onClick={clickhandler}
            >
              Save
            </Button>
            {err != "" && <p style={{ color: "red" }}>{err}</p>}

            <Button
              sx={{
                position: "absolute",
                top: "0",
                right: "0",
                backgroundColor: "#EF5350",
                color: "#fff",
              }}
              onClick={() => setOpen(false)}
            >
              X
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
};
const Card = (props) => {
  // console.log("changed "+props.color)
  const [
    open,
    setOpen,
    err,
    setErr,
    title,
    settitle,
    category,
    setcategory,
    text,
    settext,
    deleteE,
    setdelete,
  ] = useContext(EditContext);

  const editClickHandler = (e) => {
    var id = e.target.id;
    var index;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) index = i;
    }
    settitle(data[index].title);
    setcategory(data[index].category);

    settext(data[index].text);
    setOpen(true);
  };
  const deleteHandler = (e) => {
    var id = e.target.id;
    var index;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) index = i;
    }
    data.splice(index, 1);
    setdelete(!deleteE);
  };
  return (
    <div
      className="Card"
      style={{
        backgroundColor: props.color,
        width: "350px",
        overflow: "hidden",
      }}
      //   onClick={(e)=>{props.color="#fff"}}
    >
      <h4 id="topbar">
        <div>{props.header}</div>
        <div>
          <span style={{ cursor: "pointer" }}>
            <i class="fas fa-edit" onClick={editClickHandler} id={props.id}></i>
          </span>
          <span style={{ marginLeft: "10px" }}>
            <i class="fas fa-trash" onClick={deleteHandler} id={props.id}></i>
          </span>
        </div>
      </h4>
      <hr />
      <h3>{props.title}</h3>
      <p>{props.text}</p>
    </div>
  );
};
