import { List as ListAnd, ListProps } from 'antd'

function List<T>(props: ListProps<T>) {
  return (
    <ListAnd
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 4,
      }}
      {...props}
    >
      {props.children}
    </ListAnd>
  )
}

List.Item = ListAnd.Item

export { List }
