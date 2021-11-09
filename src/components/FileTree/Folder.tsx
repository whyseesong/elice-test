import { useState, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons";

const Folder = ({ name, children }: { name: string; children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div style={{ paddingLeft: "15px", lineHeight: "1.5rem" }}>
      <FontAwesomeIcon icon={isOpen ? faFolderOpen : faFolder} />
      <span style={{ paddingLeft: "0.5rem" }} onClick={handleClick}>
        {name}
      </span>
      {isOpen && children}
    </div>
  );
};

export default Folder;
