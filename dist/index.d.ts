import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, JSX } from 'react';

/**
 * Types
 */
type Direction = "vertical" | "horizontal";
interface SectionBase {
    children: ReactNode;
    scroll?: boolean;
    grow?: boolean;
    shrink?: boolean;
    minSize?: string;
    maxSize?: string;
    sticky?: boolean;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    resizable?: boolean;
    collapsible?: boolean;
    collapsed?: boolean;
    onResize?: (size: number) => void;
    initialSize?: number;
    persistKey?: string;
    animated?: boolean;
    onToggleCollapse?: (collapsed: boolean) => void;
    showToggle?: boolean;
    minSnapSize?: number;
    resizeBarClass?: (props: any) => string;
}
interface SmartLayoutProps {
    direction?: Direction;
    children: ReactNode;
    className?: string;
    preset?: "modal" | "card" | "split" | "sidebar";
    responsive?: boolean;
    as?: keyof JSX.IntrinsicElements;
}
/**
 * Main Layout Component
 */
declare const SmartLayout: {
    ({ children, direction, className, preset, responsive, as, }: SmartLayoutProps): react_jsx_runtime.JSX.Element;
    Header(props: SectionBase): react_jsx_runtime.JSX.Element;
    Body(props: SectionBase): react_jsx_runtime.JSX.Element;
    Footer(props: SectionBase): react_jsx_runtime.JSX.Element;
};

export { type Direction, type SectionBase, SmartLayout, type SmartLayoutProps };
