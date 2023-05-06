import '@testing-library/jest-dom'

beforeAll(() => {
  process.env.VITE_BASE_URL = 'http://test.com'
})
