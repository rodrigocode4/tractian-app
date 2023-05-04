import * as React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsGantt from 'highcharts/modules/gantt'

import { AssetType } from '../assets.types'

HighchartsGantt(Highcharts)

const options: Highcharts.Options = {
  title: {
    text: undefined,
  },
  xAxis: {
    type: 'datetime',
  },
  tooltip: {
    pointFormat: '<br>Start: {point.start:%e. %b %Y}<br>End: {point.end:%e. %b %Y}',
  },
  colors: ['#7cb5ec', '#f7a35c', '#8085e9', '#f15c80'],
}

const healthHistoryMapper = (healthHistory: AssetType['healthHistory']) => {
  const categories = [...new Set(healthHistory.map(({ status }) => status)).keys()]

  const data = healthHistory.map((data, index, datas) => {
    const endDate = datas[index + 1]?.timestamp

    if (endDate && datas.length > 1) {
      return {
        id: `${index}`,
        dependency: `${--index}`,
        name: data.status,
        start: new Date(data.timestamp).getTime(),
        end: new Date(endDate).getTime(),
        y: categories.findIndex((status) => data.status === status),
      }
    }

    return {
      dependency: `${--index}`,
      name: data.status,
      start: new Date(data.timestamp).getTime(),
      end: new Date(data.timestamp).getTime(),
      y: categories.findIndex((status) => data.status === status),
      milestone: categories.length > 1,
    }
  })

  return {
    categories,
    data,
  }
}

interface Props {
  healthHistory: AssetType['healthHistory']
}

function HightChatsHistory({ healthHistory }: Props) {
  const { categories, data } = React.useMemo(
    () => healthHistoryMapper(healthHistory),
    [healthHistory],
  )
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        ...options,
        yAxis: {
          title: undefined,
          reversed: true,
          categories,
        },
        series: [
          {
            name: 'Health History',
            type: 'gantt',
            data,
          },
        ],
      }}
    />
  )
}

export const HightChatsHealthHistory = React.memo(HightChatsHistory)
