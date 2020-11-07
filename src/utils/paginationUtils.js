
export const serializeQuery = query => Object.keys(query)
.map(key => `${key}=${query[key]}`)
.join('&');