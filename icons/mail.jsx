import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Mail = (props) => (
  <Svg
    width={20}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M18 0H2C.9 0 .01.9.01 2L0 14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V2l8 5 8-5v2Z"
      fill="#ACACAC"
    />
  </Svg>
)

export default Mail
