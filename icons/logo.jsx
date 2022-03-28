import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

const Logo = (props) => (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={328}
    height={220}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      d="M19.972 82.101v-2.5H2.5V2.5h159v88h5v-88h159v77.101h-16.678V140.4H325.5v77.1h-159V131h-5v86.5H2.5v-77.101h17.472V82.101zm293.85 2.5H325.5V135.4h-11.678V84.601zM14.972 135.4H2.5V84.601h12.472V135.4z"
    />
    <Path
      fill="#fff"
      d="M120.133 122.678H64.641v57.655H35.738V39.246h91.332v23.547H64.64v36.435h55.493v23.45zm172.128-67.734-54.368 125.389h-29.454l54.465-118.412h-69.916V39.246h99.273v15.698z"
    />
    <Circle cx={164} cy={110} r={6} fill="#fff" />
  </Svg>
)

export default Logo
