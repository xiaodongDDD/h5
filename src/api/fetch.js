//拼接参数
function obj2String(obj, arr = [], idx = 0) {
  for (let item in obj) {
    arr[idx++] = [item, obj[item]]
  }
  return new URLSearchParams(arr).toString()
}


const headers = new Headers({
  "Content-Type": "application/json",
})

function commonFetcdh(url, options, method = 'GET') {
  const searchStr = obj2String(options);
  let initObj = {};
  if (method === 'GET') {
    //get 请求，拼接url
    url += '?' + searchStr
    initObj = {
      method: method,
    }
  } else {
    //post 请求，参数为body
    initObj = {
      method: method,
      credentials: 'include',
      headers: headers,
      body: searchStr
    }
  }
  fetch(url, initObj).then((res) => {
    return res.json()
  }).then((res) => {
    return res
  })
}

/**
 * GET请求
 * @param url 请求地址
 * @param options 请求参数
 */
function GET(url, options) {
  return commonFetcdh(url, options, 'GET')
}

/**
 * POST请求
 * @param url 请求地址
 * @param options 请求参数
 */
function POST(url, options) {
  return commonFetcdh(url, options, 'POST')
}
