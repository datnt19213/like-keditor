// src/SmartLayout.tsx
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import clsx from "clsx";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp
} from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var LayoutContext = createContext({
  direction: "vertical"
});
var getStyle = (isVertical, section, size) => {
  const baseStyle = size ? isVertical ? { height: size } : { width: size } : {};
  return {
    ...baseStyle,
    ...section.maxSize ? isVertical ? { maxHeight: section.maxSize } : { maxWidth: section.maxSize } : {},
    ...section.minSize ? isVertical ? { minHeight: section.minSize } : { minWidth: section.minSize } : {}
  };
};
var getClass = (section, isVertical) => clsx(
  section.className,
  section.grow && "flex-1",
  section.shrink && "shrink-0",
  section.scroll ? "overflow-auto" : "overflow-hidden",
  section.sticky && (isVertical ? "sticky top-0 z-10 bg-inherit" : "sticky left-0 z-10 bg-inherit"),
  section.collapsible && section.collapsed && isVertical && " h-fit",
  section.collapsible && section.collapsed && !isVertical && " w-fit",
  section.animated && "transition-all duration-300 ease-in-out",
  "relative"
);
var usePersistentSize = (key, initial) => {
  const [size, setSize] = useState(() => {
    if (key) {
      const stored = localStorage.getItem(`layout-size-${key}`);
      return stored ? Number(stored) : initial;
    }
    return initial;
  });
  const setAndPersist = (v) => {
    if (key) localStorage.setItem(`layout-size-${key}`, String(v));
    setSize(v);
  };
  return [size, setAndPersist];
};
var Section = ({
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
}) => {
  const Tag = as;
  const { direction } = useContext(LayoutContext);
  const isVertical = direction === "vertical";
  const ref = useRef(null);
  const [size, setSize] = usePersistentSize(persistKey, initialSize);
  const [collapsed, setCollapsed] = useState(propCollapsed ?? false);
  const resizing = useRef(false);
  const onMouseMove = (e) => {
    if (!resizing.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    let newSize = isVertical ? e.clientY - rect.top : e.clientX - rect.left;
    newSize = Math.max(newSize, minSnapSize);
    setSize(newSize);
    onResize?.(newSize);
  };
  const onMouseUp = () => {
    resizing.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };
  const handleMouseDown = (e) => {
    e.preventDefault();
    resizing.current = true;
    document.addEventListener("mousemove", onMouseMove);
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
  return /* @__PURE__ */ jsxs(
    Tag,
    {
      ref,
      className: getClass({ ...props, collapsible, collapsed }, isVertical),
      style: getStyle(isVertical, props, collapsed ? 0 : size),
      children: [
        showToggle && collapsible && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: toggleCollapsed,
            className: clsx(
              "fixed z-30 rounded p-1 text-sm text-muted-foreground hover:bg-muted",
              isVertical ? "right-2 top-2" : "left-2 top-2"
            ),
            children: collapsed ? isVertical ? /* @__PURE__ */ jsx(ChevronDown, { size: 16 }) : /* @__PURE__ */ jsx(ChevronRight, { size: 16 }) : isVertical ? /* @__PURE__ */ jsx(ChevronUp, { size: 16 }) : /* @__PURE__ */ jsx(ChevronLeft, { size: 16 })
          }
        ),
        !collapsed && children,
        resizable && /* @__PURE__ */ jsx(
          "div",
          {
            onMouseDown: handleMouseDown,
            className: clsx(
              "absolute z-20",
              isVertical ? "-bottom-1 left-0 right-0 h-2 hover:bg-black cursor-row-resize" : "right-0 top-0 bottom-0 w-2 hover:bg-black cursor-col-resize",
              resizeBarClass?.({ resizable, isVertical }) || ""
            )
          }
        )
      ]
    }
  );
};
var SmartLayout = ({
  children,
  direction = "vertical",
  className,
  preset,
  responsive,
  as = "div"
}) => {
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
  return /* @__PURE__ */ jsx(LayoutContext.Provider, { value: { direction }, children: /* @__PURE__ */ jsx(Tag, { className: layoutClass, children }) });
};
SmartLayout.Header = (props) => /* @__PURE__ */ jsx(Section, { ...props });
SmartLayout.Body = (props) => /* @__PURE__ */ jsx(Section, { grow: true, scroll: true, ...props });
SmartLayout.Footer = (props) => /* @__PURE__ */ jsx(Section, { ...props });
export {
  SmartLayout
};
//# sourceMappingURL=index.mjs.map