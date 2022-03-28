import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Exit = (props) => (
  <Svg
    width={20}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m15 4-1.41 1.41L16.17 8H6v2h10.17l-2.58 2.58L15 14l5-5-5-5ZM2 2h8V0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h8v-2H2V2Z"
      fill="#ACACAC"
    />
  </Svg>
)

export default Exit
