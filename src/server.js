import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import Helmet from "react-helmet";
import { compose, createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import rootReducer from "./reducers";

const app = express();

// app.use( express.static( path.resolve( __dirname, "../dist" ) ) );

app.use('/*', (req, res) => {

    const finalCreateStore = compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);

    const context = {};
    const store = finalCreateStore(rootReducer);

    // store.dispatch({
    //     type: 'INITIALIZE_SESSION'
    // });

    const jsx = (
        <ReduxProvider store={ store }>
            <StaticRouter context={ context } location={ req.url }>
                {/*<Layout />*/}
            </StaticRouter>
        </ReduxProvider>
    );
console.log('hehehiooiscoiasconas')
    const reactDom = renderToString(jsx);
    const reduxState = store.getState();
    const helmetData = Helmet.renderStatic();

    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(htmlTemplate(reactDom, reduxState, helmetData));

});

app.listen(3002);

const htmlTemplate = (reactDom, reduxState, helmetData) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            ${ helmetData.title.toString( ) }
            ${ helmetData.meta.toString( ) }
            <title>React SSR</title>
        </head>
        
        <body>
            <div id="app">${ reactDom }</div>
            <script>
                window.REDUX_DATA = ${ JSON.stringify( reduxState ) }
            </script>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `;
};