import { CSSProperties } from "react";
import { MdPlace } from "react-icons/md";
import { MdOutlineWork } from "react-icons/md";
import { IJob } from "../App";

export function JobBody({ job }: { job: IJob }) {
  return (
    <div style={stylesJobBodyContainer}>
      <span style={stylesJobTitle}>{job.title}</span>
      <div style={stylesJobSubtitleContainer}>
        <div style={stylesJobSubtitle}>{job.category}</div>
        <div style={stylesJobSubtitle}>
          <MdPlace />
          {job.location}
        </div>
        <div style={stylesJobSubtitle}>
          <MdOutlineWork />
          {job.company}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              ...clampDescription,
              fontSize: "13px",
              width: "80%",
            }}
          ></div>
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
const stylesJobTitle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  fontSize: "22px",
  fontFamily: "Roboto",
  fontWeight: "400",
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

const clampDescription: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 5,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "100%",
  // border: "2px solid red",
};
