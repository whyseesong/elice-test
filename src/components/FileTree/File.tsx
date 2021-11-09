import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

const File = ({ name, dir }: { name: string; dir: string }) => {
  return (
    <div style={{ paddingLeft: "15px", lineHeight: "1.5rem" }}>
      <FontAwesomeIcon icon={faFile} />
      <span id="file" style={{ paddingLeft: "0.5rem" }} data-dir={dir}>
        {name}
      </span>
    </div>
  );
};

export default File;
