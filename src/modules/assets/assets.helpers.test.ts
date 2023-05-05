import { Palette } from '~/infrastructure/palette'

import { getColorHealth, getColorStatus, getTextStatus } from './assets.helpers'

describe('Assets Helpers', () => {
  describe('getColorHealth', () => {
    test.each`
      value  | expected
      ${100} | ${Palette.green}
      ${50}  | ${Palette.yellow}
      ${25}  | ${Palette.red}
    `('Give value When equal "$value" Then return "$expected"', ({ value, expected }) => {
      expect(getColorHealth(value)).toBe(expected)
    })
  })

  describe('getColorStatus', () => {
    test.each`
      value              | expected
      ${'inOperation'}   | ${Palette.green}
      ${'inAlert'}       | ${Palette.yellow}
      ${'inDowntime'}    | ${Palette.red}
      ${'plannedStop'}   | ${Palette.redDark}
      ${'unplannedStop'} | ${Palette.orange}
    `('Give value When equal "$value" Then return "$expected"', ({ value, expected }) => {
      expect(getColorStatus(value)).toBe(expected)
    })
  })

  describe('getTextStatus', () => {
    test.each`
      value              | expected
      ${'inOperation'}   | ${'In operation'}
      ${'inAlert'}       | ${'In alert'}
      ${'inDowntime'}    | ${'In downtime'}
      ${'plannedStop'}   | ${'Planned stop'}
      ${'unplannedStop'} | ${'Unplanned stop'}
    `('Give value When equal "$value" Then return "$expected"', ({ value, expected }) => {
      expect(getTextStatus(value)).toBe(expected)
    })
  })
})
