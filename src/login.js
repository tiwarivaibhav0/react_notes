import {
  Box,
  Button,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { Context } from "./App";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};
export const Login = () => {
  const [open, setOpen] = React.useState(true);
  const [number, setNumber] = React.useState("");

  const [err, setErr] = React.useState("");
  const [otp, setOTP] = React.useState("");
  const [checkotp, setcheckOTP] = React.useState("");

  const [,setLogged]=useContext(Context);

  const handleClose = () => setOpen(true);
  const clickhandler = () => {
    if (number.length === 0) setErr("**Mobile Number can't be empty");
    else if (number.length !== 10) setErr("**Invalid Mobile Number");
    else{
        alert("Your OTP : 7425");
        setOTP("7425")
    }
  };
  const clickhandler2 = () => {
    if (checkotp.length === 0) setErr("**OTP can't be empty");
    else if (checkotp!="7425") setErr("**Invalid OTP");
    else{
        alert("Verified");
        setLogged(1);
    }
  };
  return (
    <div className="login">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // sx={{display:{xs:'none',sm:'flex',md:"flex",lg:"flex"}}}
      > 
        <Box sx={style}>
          <h1>Notes.in</h1>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "#4CAF50" }}
          >
            Register/Login
          </Typography>
          {otp===""?(<> <OutlinedInput
            placeholder="Mobile no."
            sx={{ m: 2 }}
            type="number"
            onChange={(e) => {
              setNumber(e.target.value);
              setErr("");
            }}
            value={number}
          />
          {/* <OutlinedInput placeholder="Email" sx={{ m: 2 }} /> */}

          {/* <FormControlLabel 
            control={<Checkbox defaultChecked />}
            label="Agree to Terms?"
          /> */}
          <br />
          <Button
            variant="contained"
            color="success"
            sx={{ m: 2 }}
            onClick={clickhandler}
          >
            Send OTP
          </Button>
          {err !== "" && <p style={{ color: "red" }}>{err}</p>}</>):(<>
            <OutlinedInput
            placeholder="Enter OTP"
            sx={{ m: 2 }}
            type="number"
            onChange={(e) => {
              setcheckOTP(e.target.value);
              setErr("")
             
            }}
          />
          {/* <OutlinedInput placeholder="Email" sx={{ m: 2 }} /> */}

          {/* <FormControlLabel 
            control={<Checkbox defaultChecked />}
            label="Agree to Terms?"
          /> */}
          <br />
          <Button
            variant="contained"
            color="success"
            sx={{ m: 2 }}
            onClick={clickhandler2}
          >
           Verify
          </Button>
          {err != "" && <p style={{ color: "red" }}>{err}</p>}
          </>)}

         

          {/* <Button sx={{position:"absolute",top:"0",right:"0",backgroundColor:"#EF5350",color:"#fff"}} onClick={()=>setOpen2(false)}>X</Button> */}
        </Box>
      </Modal>
    </div>
  );
};
