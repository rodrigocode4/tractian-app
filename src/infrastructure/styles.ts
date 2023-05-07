/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-prototype-builtins */
import * as React from 'react'

type Styles = { [key: string]: React.CSSProperties }

export function makeStyles<T extends Styles>(styles: T) {
  return function useStyles() {
    const result: { [key in keyof T]: React.CSSProperties } = {} as any
    for (const styleName in styles) {
      if (styles.hasOwnProperty(styleName)) {
        result[styleName] = styles[styleName]
      }
    }
    return result
  }
}
