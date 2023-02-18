import React from "react";
import Icon from "@mdi/react";
import { CSSProperties, RefObject, AriaAttributes } from "react";
import { Button } from "@chakra-ui/react";

interface HTMLProps extends AriaAttributes {
  className?: string;
}

interface IconProps extends HTMLProps {
  id?: string;
  path: string;
  ref?: RefObject<SVGSVGElement>;
  title?: string | null;
  description?: string | null;
  size: number | string | null;
  color?: string | null;
  horizontal?: boolean;
  vertical?: boolean;
  rotate?: number;
  spin?: boolean | number;
  style?: CSSProperties;
  inStack?: boolean;
}

interface OnClickIconProps extends IconProps {
  onClick?: Function;
}

// I NEED TO FIGURE OUT HOW TO PASS ALL THESE PROPS

export default function OnClickIcon(props: OnClickIconProps) {
  return (
    <Button
      onClick={() => (props.onClick ? props.onClick() : null)}
      bg="none"
      p="0"
      h="min-content"
      w="min-content"
      minW="0"
      cursor="auto"
      _hover={{
        bg: "none",
        cursor: "auto",
      }}
    >
      <Icon className="onclick-icon" path={props.path} size={props.size} />
    </Button>
  );
}
