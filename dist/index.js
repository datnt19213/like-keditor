"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  SmartLayout: () => SmartLayout
});
module.exports = __toCommonJS(index_exports);

// src/SmartLayout.tsx
var import_react = require("react");
var import_clsx = __toESM(require("clsx"));
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var LayoutContext = (0, import_react.createContext)({
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
var getClass = (section, isVertical) => (0, import_clsx.default)(
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
  const [size, setSize] = (0, import_react.useState)(() => {
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
  const { direction } = (0, import_react.useContext)(LayoutContext);
  const isVertical = direction === "vertical";
  const ref = (0, import_react.useRef)(null);
  const [size, setSize] = usePersistentSize(persistKey, initialSize);
  const [collapsed, setCollapsed] = (0, import_react.useState)(propCollapsed ?? false);
  const resizing = (0, import_react.useRef)(false);
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
  (0, import_react.useEffect)(() => {
    return () => onMouseUp();
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    Tag,
    {
      ref,
      className: getClass({ ...props, collapsible, collapsed }, isVertical),
      style: getStyle(isVertical, props, collapsed ? 0 : size),
      children: [
        showToggle && collapsible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            onClick: toggleCollapsed,
            className: (0, import_clsx.default)(
              "fixed z-30 rounded p-1 text-sm text-muted-foreground hover:bg-muted",
              isVertical ? "right-2 top-2" : "left-2 top-2"
            ),
            children: collapsed ? isVertical ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronDown, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronRight, { size: 16 }) : isVertical ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronUp, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronLeft, { size: 16 })
          }
        ),
        !collapsed && children,
        resizable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            onMouseDown: handleMouseDown,
            className: (0, import_clsx.default)(
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
  const layoutClass = (0, import_clsx.default)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutContext.Provider, { value: { direction }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: layoutClass, children }) });
};
SmartLayout.Header = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { ...props });
SmartLayout.Body = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { grow: true, scroll: true, ...props });
SmartLayout.Footer = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { ...props });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartLayout
});
//# sourceMappingURL=index.js.map