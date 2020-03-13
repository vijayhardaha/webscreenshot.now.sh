
const { getScreenshot } = require( './chromium' );
const express = require( 'express' );
const bodyParser = require( "body-parser" );
const cors = require( 'cors' );
const app = express();

// use it before all route definitions
app.use( cors( { origin: true } ) );

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

app.post( '/*', async ( req, res ) => {
  const { body } = req;
  const { url, width = 800, height = 600, quality = 1, full = 0, type } = body;
  const fullPage = parseInt( full ) === 1;

  if ( !url ) {
    return res.status( 400 ).send( 'Please provide a URL. Example: ?url=https://example.com' );
  }

  let response;
  try {
    const file = await getScreenshot( { url, width, height, quality, type, fullPage } );
    response = res.status( 200 ).send( { success: true, image: "data:image/png;base64," + file } );
  } catch ( e ) {
    response = res.status( 500 ).send( e.toString() );
  }

  return response;
} );

module.exports = app;
