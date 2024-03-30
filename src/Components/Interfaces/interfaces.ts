import { ReactNode, MouseEvent, HTMLProps, RefObject } from "react";

export interface ButtonProps {
  btnContainerClass?: string;
  btnClass?: string;
  click: (event: MouseEvent<HTMLButtonElement>) => void;
  tooltip?: boolean;
  tooltipData?: string;
  index?: number;
  name: string;
  loading?: boolean;
  disabled?: boolean;
  typeVal?: "button" | "submit" | undefined;
}

export interface IconButtonProps {
  btnContainerClass?: string;
  tooltip?: boolean;
  tooltipData?: string;
  click: (event: MouseEvent<HTMLDivElement>) => void;
  icon: ReactNode;
}

export interface InputElementProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  type: string;
  uid: string;
  placeholder?: string;
  containerClass?: string;
  icon?: React.ReactNode;
  errMsg?: string;
  successMsg?: string;
  reference?: RefObject<HTMLInputElement>;
}

export interface TextInputElementProps extends HTMLProps<HTMLTextAreaElement> {
  label?: string;
  type: string;
  key: string;
  uid: string;
  placeholder?: string;
  containerClass?: string;
}

export interface DropdownProps {
  labelName: string;
  key: string;
  options: any;
  optionSelect: (value: { dateFrom: string; dateTo: string }) => void;
  value: any;
  placeholder?: string;
  disabled?: boolean;
}

export interface FrameInterface {
  containerClass: string;
  withHeader: boolean;
  headerTitle: string;
  withSearchBox: boolean;
  children: ReactNode;
  withInternalNavigation?: boolean;
  withNavigation?: boolean;
  withDate?: boolean;
  internalNavigation?: string;
  updateData?: () => void;
}

export interface ActivityInterface {
  _id: string;
  userId: string;
  type: string;
  title: string;
  date: string;
  __v: number;
}

export interface HeaderProps {
  headerText: string;
  withSearchBox: boolean;
  withInternalNavigation: boolean;
  internalNavigation: boolean;
  withDate: boolean;
  updateData: () => {};
}

export interface errMsgInterface {
  email?: string;
}

export interface LandingHeaderProps {
  sectionListing?: boolean;
  navListing?: boolean;
}
