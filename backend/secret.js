const secrets = {
    // The URL that we use to connect to the MongoDB Atlas Cluster.
    dbUrl: ''
};

const getSecret = key => secrets[key];

module.exports = getSecret;