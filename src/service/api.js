// const basic = 'http://quan-test.xiaoheiban.cn/api/Quan'

export const API = {
  get: (url) => {
    return window.fetch(`?method=${url}`, {
      method: "GET",
      mode: "cors",
      redirect: "follow",
      headers: {
        "Content-Type": 'application/json',
        //authorization: store.get("user") && store.get("user").clientToken,
      },  //从store中获取用户的token
    })
      .then(res => {
        return res.json();
      },
        err => {
        return err.json()
        }
      );
  },
  post: (url, body) => {
    return window.fetch(`${url}`, {
      method: "POST",
      mode: "cors",
      redirect: "follow",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => {
        return res.json()
      },
        err => {
          return err.json()
        }
        )
  },
};



