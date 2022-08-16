import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export type PortalProps = {
  /**
   * 被挂载的内容
   * @en Content to be mounted
   */
  children?: React.ReactNode;
  /**
   * 容器获取函数
   * @en Container getter function
   * @default () => document.body
   */
  getContainer?: () => HTMLElement;
};

/**
 * React.createPortal的简单封装。
 */
const Portal: React.FC<PortalProps> = (props) => {
  const { children, getContainer } = props;
  const [container, setContainer] = useState<HTMLElement>();

  useEffect(() => {
    setContainer(getContainer ? getContainer() : document.body);
  }, [getContainer]);

  return container ? ReactDOM.createPortal(children, container) : null;
};

export default Portal;

/**
<Portal>
  <div className="demo-protal-text">This is the DOM mounted directly on the body</div>
</Portal>
 */