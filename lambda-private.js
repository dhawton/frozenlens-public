const AWS = require("aws-sdk");
const S3 = new AWS.S3();
const bucket = "media.frozenlens.org";
const dynamo = new AWS.DynamoDB();

exports.handler = function (event, context, callback) {
  const done = function (err, res) {
    callback(null, {
      statusCode: err ? "400" : "200",
      body: err ? err.message : JSON.stringify(res),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  };

  var path = event.pathParameters.proxy;

  if (path === "albums") {
    switch (event.httpMethod) {
      case "GET":
        S3.getObject(
          {
            Bucket: bucket,
            Key: "albums.json"
          },
          function (err, data) {
            done(err, err ? null : JSON.parse(data.Body.toString()));
          }
        );
        break;
      case "PUT":
      case "POST":
        S3.getObject(
          {
            Bucket: bucket,
            Key: "albums.json"
          },
          function (err, data) {
            if (err) done(err, null);
            let albums = JSON.parse(data.Body.toString());
            let newAlbum = JSON.parse(event.body);
            const i = albums.map(e => e.id).indexOf(newAlbum.id);
            if (i > -1) {
              albums[i] = { ...albums[i], ...newAlbum };
            } else {
              Array.push(albums, newAlbum);
            }
            S3.upload(
              {
                Bucket: bucket,
                Key: "albums.json",
                Body: JSON.stringify(albums)
              },
              function (err) {
                if (err) done(err, null);
                done(null, "");
              }
            );
          }
        );
        break;
      case "DELETE":
        S3.getObject(
          {
            Bucket: bucket,
            Key: "albums.json"
          },
          function (err, data) {
            if (err) done(err, null);
            let albums = JSON.parse(data.Body.toString());
            let oldAlbum = JSON.parse(event.body);
            albums = albums.filter(a => a.id !== oldAlbum.id);
            S3.upload(
              {
                Bucket: bucket,
                Key: "albums.json",
                Body: JSON.stringify(albums)
              },
              function (err) {
                if (err) done(err, null);
                done(null, "");
              }
            );
          }
        );
        break;
      default:
        done("No cases hit");
        break;
    }
  } else {
    done(null, "hello");
  }
};
