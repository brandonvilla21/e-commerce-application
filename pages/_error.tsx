import React from 'react'
import Error, { DefaultErrorIProps } from 'next/error'
import { NextContext } from 'next';

// TODO Add better types (or enums if fits)
const statusCodes: any = {
  400: 'Bad Request',
  404: 'This page could not be found',
  500: 'Internal Server Error',
  501: 'Not Implemented'
}
interface ErrorNextContext extends NextContext {
  err?: {
    name: string
    message: string
    stack?: string
    statusCode: number
  }
}

export default class MyError<P = {}> extends React.Component<P & DefaultErrorIProps> {
  static getInitialProps (context: ErrorNextContext): Promise<DefaultErrorIProps> | DefaultErrorIProps {
    const { res, err } = context
    const statusCode =
      res && res.statusCode ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }

  render () {
    const { statusCode } = this.props
    return (
      <Error statusCode={statusCode} />
    )
  }
}
