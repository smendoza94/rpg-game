// this should be in .env file
// this is secret to decode JWT
const secret = "secret";

// expiration for jwt
const expiration = "2h";

module.exports = {
	secret,
	expiration,
};
