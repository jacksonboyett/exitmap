import { useState } from "react";

interface Props {
  onClick?: Function;
  type?: "button" | "submit" | "reset" | undefined;
  children?: any;
  classNames?: string[] | string;
}

export default function Button(props: Props) {
  const [active, setActive] = useState(false);

  const activeClass = active ? "active-button" : "";
  const classes = `button-component ${activeClass} ${props.classNames}`;
  return (
    <button
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
      onClick={(e) => {
        e.preventDefault();
        if (props.onClick) props.onClick(e);
      }}
      className={classes}
      type={props.type}
    >
      {props.children}
    </button>
  );
}
