import Svg, { Path } from "react-native-svg";
import { IconProps } from "./types";

export default function MicrophoneIcon(props: IconProps) {
  return (
    <Svg
      height={props.height || 20}
      width={props.width || 16}
      viewBox="0 0 16 20"
      fill={props.fill}
    >
      <Path d="M8.75 16.7119V19C8.75 19.414 8.414 19.75 8 19.75C7.586 19.75 7.25 19.414 7.25 19V16.7119C3.327 16.3339 0.25 13.02 0.25 9C0.25 8.586 0.586 8.25 1 8.25C1.414 8.25 1.75 8.586 1.75 9C1.75 12.446 4.554 15.25 8 15.25C11.446 15.25 14.25 12.446 14.25 9C14.25 8.586 14.586 8.25 15 8.25C15.414 8.25 15.75 8.586 15.75 9C15.75 13.02 12.673 16.3329 8.75 16.7119ZM8 0.5C5.519 0.5 3.5 2.519 3.5 5V9C3.5 11.481 5.519 13.5 8 13.5C10.481 13.5 12.5 11.481 12.5 9V5C12.5 2.519 10.481 0.5 8 0.5Z" />
    </Svg>
  );
}
