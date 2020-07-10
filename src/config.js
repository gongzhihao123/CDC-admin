const Environment = process.env.NODE_ENV !== 'production'
const BASE_UR = Environment ? '/portal-server' : ''

export default BASE_UR
