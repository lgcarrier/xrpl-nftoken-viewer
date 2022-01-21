const dotenv = require('dotenv');
dotenv.config();

var config = {
    server: {
        name: process.env.SERVER_NAME,
        address: process.env.SERVER_ADDRESS,
    },
    ipfs: {
        desiredGatewayPrefix: process.env.IPFS_DESIRED_GATEWAY_PREFIX
    }
};

module.exports = config;