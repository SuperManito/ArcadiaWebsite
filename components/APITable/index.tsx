/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client'

import type { ComponentProps, ReactElement, ReactNode } from 'react'
import React, {

  isValidElement,
} from 'react'
import styles from './styles.module.css'

interface Props {
  readonly children: ReactElement<ComponentProps<'table'>>
  readonly name?: string
}

// ReactNode equivalent of HTMLElement#innerText
function getRowName(node: ReactElement): string {
  let curNode: ReactNode = node
  while (isValidElement(curNode)) {
    [curNode] = React.Children.toArray((curNode as any).props.children)
  }
  if (typeof curNode !== 'string') {
    throw new TypeError(
      `Could not extract APITable row name from JSX tree:\n${JSON.stringify(
        node,
        null,
        2,
      )}`,
    )
  }
  return curNode
}

function APITableRow(
  {
    name,
    children,
  }: { name: string | undefined, children: ReactElement<ComponentProps<'tr'>> },
) {
  const entryName = getRowName(children)
  const id = name ? `${name}-${entryName}` : entryName
  return (
    <tr id={id}>
      {children.props.children}
    </tr>
  )
}

/*
 * Note: this is not a quite robust component since it makes a lot of
 * assumptions about how the children looks; however, those assumptions
 * should be generally correct in the MDX context.
 */
export default function APITable({ children, name }: Props): ReactNode {
  // In fumadocs-mdx, block-level content inside JSX may be passed as a Fragment,
  // an array of nodes, or directly as a table element. Search recursively.
  function findTable(node: ReactNode): ReactElement<ComponentProps<'table'>> | undefined {
    if (!isValidElement(node))
      return undefined
    if ((node as any).type === 'table')
      return node as ReactElement<ComponentProps<'table'>>
    const childNodes = React.Children.toArray((node as any).props?.children ?? [])
    for (const child of childNodes) {
      const found = findTable(child)
      if (found)
        return found
    }
    return undefined
  }

  // Try direct match first, then search in children array
  let tableElement = findTable(children)
  if (!tableElement) {
    const childArray = React.Children.toArray(children as any)
    for (const child of childArray) {
      tableElement = findTable(child)
      if (tableElement)
        break
    }
  }

  if (!tableElement) {
    // Fallback: render children as-is if no table found
    return <>{children}</>
  }
  const [thead, tbody] = React.Children.toArray(tableElement.props.children) as [
    ReactElement<{ children: ReactElement[] }>,
    ReactElement<{ children: ReactElement[] }>,
  ]
  const rows = React.Children.map(

    (tbody as any).props.children,
    (row: ReactElement<ComponentProps<'tr'>>) => (
      <APITableRow name={name}>
        {row}
      </APITableRow>
    ),
  )

  return (
    <table className={styles.apiTable}>
      {thead}
      <tbody>{rows}</tbody>
    </table>
  )
}
