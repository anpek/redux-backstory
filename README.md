# Redux  Backstory

Redux backstory is a helper library for Redux to pre-initialise store. It has a simple API which will let your specify the list of action creators and the store you want to initialise.

## Installation
```js
yarn add redux-backstory
```
or
```js
npm i redux-backstory --save
```

## Usage
```js
backstory(store/*redux store*/, actionCreators/*list of action creators*/).then(() => {
    // Your store now has the result of the action creators you specified.
})
``` 

## Can I use it on my current project?
Redux backstory will work with both plain action creators as well as with redux-thunk.


## What was the motivation behind creating this library?
This library was originally created for a react redux universal app we were working on. We wanted to delay the initial server rendering until an asynchronous call is complete. Since react component life cycle methods are asynchronous in nature, dispatching redux actions from component life cycle methods did not solve the problem we had. We figured it will be easier if I can pre-initialise the redux store before calling renderToString on the server.

See the example below:
```js
// Actions
function fetchDataAsync(user) {
    return (dispatch) => fetch(`https://api.github.com/users/${user}`)
        .then(res => res.json())
        .then(data => {
            dispatch({ type: 'FETCH_ASYNC_SUCCESS', payload: data })
        })    
}
function fetchDataSync(data) {
    return { type: 'FETCH_SYNC_SUCCESS', payload: data };
}

// Express server
const app = express()
app.get('*', function (req, res) {
  backstory(store, [fetchDataAsync.bind(null, 'anpek'), fetchDataSync.bind(null, 'anpek')]).then(() => {
    const markup = renderToString(<App/>);
    res.send(`<html>
      <head></head>
      <body>
        <div id="root">${markup}</div>
        <script src="/main.js"></script>
      </body>
    </html>`
    );
  })
})
```