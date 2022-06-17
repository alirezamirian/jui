/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { ItemProps } from "@react-types/shared";
import { ReactElement } from "react";
import { PartialNode } from "@react-stately/collections";

interface DividerProps {}
function Divider({}: DividerProps): ReactElement {
  // eslint-disable-line @typescript-eslint/no-unused-vars
  return null as any;
}
// We don't want getCollectionNode to show up in the type definition
let _Divider = Divider as (props: DividerProps) => JSX.Element;
export { _Divider as Divider };

Divider.getCollectionNode = function* getCollectionNode<T>(
  props: ItemProps<T>
): Generator<PartialNode<T>> {
  let rendered = null;

  yield {
    type: "divider",
    element: null as any, // to prevent check on key, which is not necessary for divider
    props: props,
    rendered,
    hasChildNodes: false,
  };
};

/**
 * To be used in dynamic collections, just to provide a key and make it easy to check in the render
 * function to figure out what to render (an Item or a Divider)
 */
export class DividerItem {
  private static seq = 0;
  key = "divider_" + DividerItem.seq++;
}
