import { LoaderFunctionArgs, json, useLoaderData } from 'react-router-dom'

import { Layout, Typography, theme } from 'antd'
import { getCompanyById } from '~/modules/companies/companies.services'

import { CompanyLoaderDataType } from '../companies.types'

export async function loader({ params }: LoaderFunctionArgs) {
  const company = await getCompanyById(params.id as string)

  return json({
    company,
  })
}

export function CompanyPage() {
  const { company } = useLoaderData() as CompanyLoaderDataType

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout
      style={{ minHeight: '100%', minWidth: '100%', padding: 16, background: colorBgContainer }}
    >
      <Typography.Title style={{ alignSelf: 'center' }}>{company.name}</Typography.Title>
    </Layout>
  )
}
