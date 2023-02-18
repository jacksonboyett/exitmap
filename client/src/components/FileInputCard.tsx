import React from "react";
import Button from "./Button";

interface Props {
  children?: any;
  className?: string;
}

export default function FileInputCard(props: Props) {
  const classes = `${props.className}`;
  return (
    <div className={classes}>
      {props.children}
      <Button classNames={"remove-button"}>X</Button>
    </div>
  );
}
