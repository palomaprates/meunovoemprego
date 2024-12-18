import { CSSProperties } from "react";
import { MdPlace } from "react-icons/md";
import { MdOutlineWork } from "react-icons/md";
import { IJob } from "../App";
import { FaBuilding } from "react-icons/fa";

export function JobBody({ job }: { job: IJob }) {
  return (
    <div style={stylesJobBodyContainer}>
      <div style={stylesJobTitle}>{job.name}</div>
      <div style={stylesJobSubtitleContainer}>
        <div style={stylesJobSubtitle}>
          <MdOutlineWork />
          {job.category}
        </div>
        <div style={stylesJobSubtitle}>
          <MdPlace />
          {job.location}
        </div>
        <div style={stylesJobSubtitle}>
          <FaBuilding />
          {job.company}
        </div>
      </div>
    </div>
  );
}

const stylesJobBodyContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "start",
  width: "100%",
  // height: "100%",
  flex: 1,

  // border: "2px solid yellow",
};
const stylesJobTitle: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "100%",
  height: "100px",
  // border: "2px solid red",
  fontSize: "20px",
  fontFamily: "Roboto",
  fontWeight: "500",
  fontStyle: "normal",
};
const stylesJobSubtitle = {
  display: "flex",
  alignItems: "center",
  fontSize: "16px",
  fontFamily: "Roboto",
  fontWeight: "300",
  fontStyle: "normal",
  color: "gray",
  gap: "3px",
  // padding: "10px",
  //   border: "2px solid green",
};

const stylesJobSubtitleContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "start",
  height: "100%",
  //   border: "2px solid blue",
};

// const clampDescription: CSSProperties = {
//   display: "-webkit-box",
//   WebkitLineClamp: 5,
//   WebkitBoxOrient: "vertical",
//   overflow: "hidden",
//   textOverflow: "ellipsis",
//   width: "100%",
//   border: "2px solid red",
// };
