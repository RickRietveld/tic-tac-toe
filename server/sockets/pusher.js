let Pusher = require('pusher');

let pusher = new Pusher({
    appId: '886596',
    key: '8787ac6d77c8d767b723',
    secret: '955e111ab85f7f9e2d00',
    cluster: 'eu',
    encrypted: true
});

module.exports = {
    pusher: pusher
}