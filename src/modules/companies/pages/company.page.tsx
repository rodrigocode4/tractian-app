import { LoaderFunctionArgs, json, useLoaderData } from 'react-router-dom'

import { Typography } from 'antd'
import { PageContainer } from '~/components/page-container'
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

  return (
    <PageContainer>
      <Typography.Title style={{ alignSelf: 'center' }}>{company.name}</Typography.Title>
    </PageContainer>
  )
}
