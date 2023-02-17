import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        background: `linear-gradient( 45deg, hsl(0deg 0% 13%) 72%, hsl(225deg 1% 18%) 95%, hsl(225deg 1% 24%) 100%, hsl(225deg 1% 30%) 101%, hsl(225deg 1% 37%) 102%, hsl(225deg 1% 43%) 101%, hsl(225deg 1% 50%) 101%, hsl(225deg 2% 57%) 100%)`,
        boxStyle: "border-box",
      },
    },
  },
  colors: {
    cp: {
      ls: "#F4F0F2",
      la: "#909194",
      mc: "#D2A96E",
      da: "#A88B61",
      ds: "#202020",
    },
  },
});
