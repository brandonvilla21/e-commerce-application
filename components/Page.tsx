import Meta from './Meta'
import '../utils/routeProgress'

const Page: React.FunctionComponent = (props) => {
  return (
    <>
      <Meta />
      {props.children}
    </>
  )
}

export default Page