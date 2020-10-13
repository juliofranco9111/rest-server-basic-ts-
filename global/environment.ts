

// Si quiero subirlo a heroku entonces creo el process.env.PORT sino que use el 5000

export const SERVER_PORT: number = Number(process.env.PORT) || 5000;