import { CSSProperties } from "react";
import { MdPlace } from "react-icons/md";
import { MdOutlineWork } from "react-icons/md";
import { IJob } from "../App";
import { FaBuilding } from "react-icons/fa";

export function JobBody({ job }: { job: IJob }) {
  return (
    <div style={stylesJobBody}>
      <div style={stylesJobTitle}>{job.name}</div>
      <div style={stylesJobSubtitleContainer}>
        <div style={stylesJobSubtitle}>
          <MdOutlineWork style={{ marginRight: "5px" }} />
          {job.category}
        </div>
        <div style={stylesJobSubtitle}>
          <MdPlace style={{ marginRight: "5px" }} />
          {job.location}
        </div>
        <div style={stylesJobSubtitle}>
          <FaBuilding style={{ marginRight: "5px" }} />
          {job.company}
        </div>
      </div>
    </div>
  );
}

const stylesJobBody: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "start",
  width: "100%",
  flex: 1,
};
const stylesJobTitle: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "100%",
  height: "100px",
  fontSize: "20px",
  fontFamily: "Roboto",
  fontWeight: "500",
  fontStyle: "normal",
};
const stylesJobSubtitle: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontSize: "16px",
  fontFamily: "Roboto",
  fontWeight: "300",
  fontStyle: "normal",
  color: "gray",
};

const stylesJobSubtitleContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "start",
  height: "100%",
};
