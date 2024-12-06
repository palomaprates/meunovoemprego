// import * as React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { IJob } from "../App";
// import { CSSProperties } from "react";
// import { MdPlace } from "react-icons/md";
// import { MdOutlineWork } from "react-icons/md";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
//   color: "black",
// };

// export default function DescriptionModal({ job }: { job: IJob }) {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       <div style={stylesButtonContainer}>
//         <button>
//           {" "}
//           <Button onClick={handleOpen} style={{ color: "white" }}>
//             Ver Detalhes...
//           </Button>{" "}
//         </button>
//       </div>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             {job.title}
//           </Typography>
//           <div className="stylesJobSubtitleContainer">
//             <span className="stylesJobSubtitle">
//               {" "}
//               <MdPlace />
//               {job.company}
//             </span>

//             <span className="stylesJobSubtitle">
//               {" "}
//               <MdOutlineWork />
//               {job.location}
//             </span>
//           </div>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             {job.description}
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

// const stylesButtonContainer: CSSProperties = {
//   display: "flex",
//   justifyContent: "end",
//   height: "60px",
//   width: "210px",
//   alignItems: "end",
//   // border: "2px solid red",
// };

// // const buttonTest: CSSProperties = {
// //   borderRadius: "8px",
// //   border: "none",
// //   padding: "10px 20px",
// //   fontSize: "12px",
// //   fontWeight: "500",
// //   backgroundColor: "#2c3e50",
// //   color: "white",
// //   cursor: "pointer",
// //   transition: "background-color 0.3s ease",
// // };
