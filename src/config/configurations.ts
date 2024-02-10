// not in used
export default () => ({
	port: parseInt(process.env.PORT, 10) || 3000,
	database: {
		host: process.env.DATABASE_USER,
		port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
	},
});
