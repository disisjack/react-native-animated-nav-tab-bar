import { Animated } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";
import Styled, { css } from "styled-components/native";
import { DotSize, TabButtonLayout, TabElementDisplayOptions } from "./types";

// Config
const floatingMarginBottom = css`
  margin-bottom: ${initialWindowMetrics?.insets.bottom}px;
`;
const floatingMarginTop = css`
  margin-top: ${initialWindowMetrics?.insets.top}px;
`;
const floatingMarginHorizontal = css`
  margin-horizontal: 20px;
`;

const floatingRoundCorner = css`
  border-radius: 40px;
`;

interface IBottomTabBarWrapper {
  floating: boolean;
  shadow: boolean;
  tabBarBackground: string;
  topPadding: number;
  horizontalPadding: number;
  bottomPadding: number;
}

const BottomTabBarWrapper = Styled.View<IBottomTabBarWrapper>`
	flex-direction: row;
  ${(p) => p.floating && !!p.forcedWidth && `width: ${p.forcedWidth*100}%`};
	${(p) => p.floating && floatingMarginHorizontal};
    elevation: 2;
	${(p) => p.floating && (p.topPositioned ? floatingMarginTop : floatingMarginBottom)};
  ${(p) => p.topPositioned && floatingMarginTop};
	${(p) => p.floating && floatingRoundCorner};
  ${(p) => p.topPositioned
    ? `padding-bottom: ${p.bottomPadding}px`
    : p.floating
      ? `padding-bottom: ${p.bottomPadding}px`
      : `padding-bottom: ${initialWindowMetrics?.insets.bottom + p.bottomPadding}px`
  }
  padding-top: ${(p) => p.topPadding}px;
  padding-horizontal: ${(p) => p.horizontalPadding}px;
  background-color: ${(p) => p.tabBarBackground};
	${(p) => p.shadow && SHADOW};

  `;

const calculateDotSize = (size: DotSize) => {
  switch (size) {
    case DotSize.SMALL:
      return 40;
    case DotSize.MEDIUM:
      return 10;
    case DotSize.LARGE:
      return 5;
    default:
      return 10;
  }
};

interface ITabButton {
  tabButtonLayout: TabButtonLayout;
  focused: boolean;
  labelLength: number;
  dotSize: DotSize;
}


const TabButton = Styled.TouchableOpacity<ITabButton>`
	flex: 1;
	flex-direction: ${(p) =>
    p.tabButtonLayout == TabButtonLayout.VERTICAL
      ? "column"
      : p.tabButtonLayout == TabButtonLayout.HORIZONTAL
        ? "row"
        : "row"
  };
	justify-content: center;
	align-items: center;
	border-radius: 100px;
	padding-vertical: 10px;
	flex-grow: ${(p) =>
    p.focused ? 1.01 : 1};
`;

interface ILabelProps {
  whenInactiveShow: TabElementDisplayOptions;
  whenActiveShow: TabElementDisplayOptions;
  tabButtonLayout: TabButtonLayout;
  activeColor: string;
}

const Label = Styled(Animated.Text)<ILabelProps>`
	fontSize: ${(p) =>
    p.whenInactiveShow == TabElementDisplayOptions.BOTH || p.whenActiveShow == TabElementDisplayOptions.BOTH ? "14" : "17"}px;
	color: ${(p) => p.activeColor};
	margin-left: ${(p) =>
    (p.whenActiveShow == TabElementDisplayOptions.BOTH || p.whenInactiveShow == TabElementDisplayOptions.BOTH) &&
      p.tabButtonLayout == TabButtonLayout.HORIZONTAL
      ? 8
      : 0}px;
`;

interface IDotProps {
  topPadding: number;
  width: number;
  height: number;
  dotCornerRadius: number;
  activeTabBackground: string;
}

const Dot = Styled(Animated.View)<IDotProps>`
	position: absolute;
	top: ${(p) => p.topPadding}px;
	width: ${(p) => p.width}px;
	height: ${(p) => p.height}px;
	border-radius: ${(p) => p.dotCornerRadius}px;
	background-color: ${(p) => p.activeTabBackground};
	z-index: -1;
`;

const SHADOW = css`
  shadow-color: #000000;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.05;
  elevation: 1;
  shadow-radius: 20px;
`;

export { BottomTabBarWrapper, TabButton, Label, Dot, SHADOW };
