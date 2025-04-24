/* eslint-disable react-hooks/exhaustive-deps */
// SmartLayoutPro.tsx
import React, {
  createContext,
  CSSProperties,
  JSX,
  MouseEvent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import clsx from 'clsx';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from 'lucide-react';

/**
 * Types
 */
type Direction = "vertical" | "horizontal";

interface LayoutContextType {
	direction: Direction;
}

const LayoutContext = createContext<LayoutContextType>({
	direction: "vertical",
});

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

const getStyle = (isVertical: boolean, section: SectionBase, size?: number): CSSProperties => {
	const baseStyle = size ? (isVertical ? {height: size} : {width: size}) : {};

	return {
		...baseStyle,
		...(section.maxSize
			? isVertical
				? {maxHeight: section.maxSize}
				: {maxWidth: section.maxSize}
			: {}),
		...(section.minSize
			? isVertical
				? {minHeight: section.minSize}
				: {minWidth: section.minSize}
			: {}),
	};
};

const getClass = (section: SectionBase, isVertical: boolean) =>
	clsx(
		section.className,
		section.grow && "flex-1",
		section.shrink && "shrink-0",
		section.scroll ? "overflow-auto" : "overflow-hidden",
		section.sticky &&
			(isVertical ? "sticky top-0 z-10 bg-inherit" : "sticky left-0 z-10 bg-inherit"),
		section.collapsible && section.collapsed && isVertical && " h-fit",
		section.collapsible && section.collapsed && !isVertical && " w-fit",
		section.animated && "transition-all duration-300 ease-in-out",
		"relative"
	);

const usePersistentSize = (
	key?: string,
	initial?: number
): [number | undefined, (v: number) => void] => {
	const [size, setSize] = useState<number | undefined>(() => {
		if (key) {
			const stored = localStorage.getItem(`layout-size-${key}`);
			return stored ? Number(stored) : initial;
		}
		return initial;
	});

	const setAndPersist = (v: number) => {
		if (key) localStorage.setItem(`layout-size-${key}`, String(v));
		setSize(v);
	};

	return [size, setAndPersist];
};

const Section = ({
	children,
	as = "div",
	resizable,
	resizeBarClass,
	collapsible,
	collapsed: propCollapsed,
	onResize,
	initialSize,
	persistKey,
	onToggleCollapse,
	showToggle,
	minSnapSize = 50,
	...props
}: any) => {
	const Tag = as;
	const {direction} = useContext(LayoutContext);
	const isVertical = direction === "vertical";
	const ref = useRef<HTMLDivElement | null>(null);

	const [size, setSize] = usePersistentSize(persistKey, initialSize);
	const [collapsed, setCollapsed] = useState(propCollapsed ?? false);
	const resizing = useRef(false);

	const onMouseMove = (e: MouseEvent<Document>) => {
		if (!resizing.current || !ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		let newSize = isVertical ? e.clientY - rect.top : e.clientX - rect.left;
		newSize = Math.max(newSize, minSnapSize); // Ensures the minimum size
		setSize(newSize);
		onResize?.(newSize);
	};

	const onMouseUp = () => {
		resizing.current = false;
		document.removeEventListener("mousemove", onMouseMove as any);
		document.removeEventListener("mouseup", onMouseUp);
	};

	const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		resizing.current = true;
		document.addEventListener("mousemove", onMouseMove as any);
		document.addEventListener("mouseup", onMouseUp);
	};

	const toggleCollapsed = () => {
		const newState = !collapsed;
		setCollapsed(newState);
		onToggleCollapse?.(newState);
	};

	useEffect(() => {
		return () => onMouseUp();
	}, []);

	return (
		<Tag
			ref={ref as any}
			className={getClass({...props, collapsible, collapsed}, isVertical)}
			style={getStyle(isVertical, props, collapsed ? 0 : size)}
		>
			{showToggle && collapsible && (
				<button
					onClick={toggleCollapsed}
					className={clsx(
						"fixed z-30 rounded p-1 text-sm text-muted-foreground hover:bg-muted",
						isVertical ? "right-2 top-2" : "left-2 top-2"
					)}
				>
					{collapsed ? (
						isVertical ? (
							<ChevronDown size={16} />
						) : (
							<ChevronRight size={16} />
						)
					) : isVertical ? (
						<ChevronUp size={16} />
					) : (
						<ChevronLeft size={16} />
					)}
				</button>
			)}
			{!collapsed && children}
			{resizable && (
				<div
					onMouseDown={handleMouseDown}
					className={clsx(
						"absolute z-20",
						isVertical
							? "-bottom-1 left-0 right-0 h-2 hover:bg-black cursor-row-resize"
							: "right-0 top-0 bottom-0 w-2 hover:bg-black cursor-col-resize",
						resizeBarClass?.({resizable, isVertical}) || ""
					)}
				/>
			)}
		</Tag>
	);
};

/**
 * Main Layout Component
 */
export const SmartLayout = ({
	children,
	direction = "vertical",
	className,
	preset,
	responsive,
	as = "div",
}: SmartLayoutProps) => {
	const isVertical = direction === "vertical";

	const layoutClass = clsx(
		"w-full h-full overflow-hidden relative",
		isVertical ? "flex flex-col" : "flex flex-row",
		preset === "modal" && "rounded-xl border shadow-lg",
		preset === "card" && "rounded-md border",
		preset === "sidebar" && "border-r",
		preset === "split" && (isVertical ? "divide-y" : "divide-x"),
		responsive && "sm:flex-col md:flex-row",
		className
	);

	const Tag = as;

	return (
		<LayoutContext.Provider value={{direction}}>
			<Tag className={layoutClass}>{children}</Tag>
		</LayoutContext.Provider>
	);
};

SmartLayout.Header = (props: SectionBase) => <Section {...props} />;
SmartLayout.Body = (props: SectionBase) => <Section grow scroll {...props} />;
SmartLayout.Footer = (props: SectionBase) => <Section {...props} />;


// example in readme