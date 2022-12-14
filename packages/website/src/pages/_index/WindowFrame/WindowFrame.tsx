import React, { HTMLProps } from "react";
import clsx from "clsx";

import classes from "./WindowFrame.module.css";

export function WindowFrame({
  children,
  title,
  ...otherProps
}: {
  children: React.ReactNode;
  title?: React.ReactNode;
} & Pick<HTMLProps<HTMLDivElement>, "style" | "className">) {
  const onLinkClick = (e) => e.preventDefault();
  return (
    <div {...otherProps} className={clsx(classes.window, otherProps.className)}>
      <div className={classes.titlebar}>
        <div className={classes.buttons}>
          <div className={classes.close}>
            <a className={classes.closebutton} href="" onClick={onLinkClick}>
              <span>
                <strong>x</strong>
              </span>
            </a>
          </div>
          <div className={classes.minimize}>
            <a className={classes.minimizebutton} href="" onClick={onLinkClick}>
              <span>
                <strong>&ndash;</strong>
              </span>
            </a>
          </div>
          <div className={classes.zoom}>
            <a className={classes.zoombutton} href="" onClick={onLinkClick}>
              <span>
                <strong>+</strong>
              </span>
            </a>
          </div>
        </div>
        <div className={classes.title}>{title}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}
