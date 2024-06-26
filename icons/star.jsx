import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Star = (props) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9.99 0C4.47 0 0 4.48 0 10s4.47 10 9.99 10C15.52 20 20 15.52 20 10S15.52 0 9.99 0Zm4.24 16L10 13.45 5.77 16l1.12-4.81-3.73-3.23 4.92-.42L10 3l1.92 4.53 4.92.42-3.73 3.23L14.23 16Z"
      fill="#ACACAC"
    />
  </Svg>
)

export default Star
