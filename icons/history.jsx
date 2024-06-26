import * as React from "react"
import Svg, { Path } from "react-native-svg"

const History = (props) => (
  <Svg
    width={21}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12 0a9 9 0 0 0-9 9H0l3.89 3.89.07.14L8 9H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 12 18a9 9 0 0 0 0-18Zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V5H11Z"
      fill="#ACACAC"
    />
  </Svg>
)

export default History
