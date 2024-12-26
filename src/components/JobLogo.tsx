import { CSSProperties } from "react";
import { MdOutlineWork } from "react-icons/md";

export function JobLogo() {
  return (
    <div className="jobLogoContainer">
      <div className="stylesLogo">
        <div style={stylesIcon}>
          <MdOutlineWork />
        </div>
        <span className="textLogo">Meu Novo Emprego</span>
      </div>
    </div>
  );
}

const stylesIcon: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  minWidth: "30px",
};
