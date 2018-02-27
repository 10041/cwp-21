module.exports = (error, req, resp, next) => {
	resp.error(error);
};