# Running with Next.js

demo地址:  [demo](https://github.com/zdnsweb/demo-nextjs/)

## 创建`next.js` 

```bash
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
```


## 运行

```bash
npm run dev
```

## 修改到支持typescript

添加: `tsconfig.json`

安装:

```
npm install --save-dev typescript @types/node
```


## 创建列表页面
```
touch pages/repo.tsx
```

获取静态数据
```javascript
export async function getStaticProps(context) {
  const resp = await fetch('https://api.github.com/orgs/zdnsweb/repos');

  const repos = await resp.json();

  return {
    props: {
      repos,
    }, // will be passed to the page component as props
  };
}
```

## 创建详情页面

```
touch pages/repo/[name].tsx
```

获取静态数据
```javascript
export async function getStaticProps({ params: { name }}) {
  const resp = await fetch(`https://api.github.com/repos/zdnsweb/${name}`);

  const repo = await resp.json();

  return {
    props: {
      repo,
    }, // will be passed to the page component as props
  };
}
```

选择那些接口使用SSG生成
```javascript
export async function getStaticPaths() {
  const resp = await fetch('https://api.github.com/orgs/zdnsweb/repos');
  const repos = await resp.json();
  const paramsList = repos.map(({ name }) => ({
    params: { name },
  }));

  return {
    paths: paramsList,
    fallback: false,
  };
}
```

## 连接后端`API`

创建`server.js`
```javascript
const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require("http-proxy-middleware")

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const apiPaths = {
    '/socket': {
        target: 'http://localhost:4000',
        ws: true,
        changeOrigin: true
    }
}

const isDevelopment = process.env.NODE_ENV !== 'production'

app.prepare().then(() => {
  const server = express()

  if (isDevelopment) {
    server.use('/socket', createProxyMiddleware(apiPaths['/socket']));
  }

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}).catch(err => {
    console.log('Error:::::', err)
})
```

修改
```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
// ====
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "next start"
  },
```

#work/zdns/ppt
