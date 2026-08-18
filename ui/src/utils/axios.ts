import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

/**
 * Axios instance configured with base URL and authentication interceptors
 */
const api = axios.create({
	baseURL: process.env.REACT_APP_API_HOST || "http://localhost:8000",
	withCredentials: true, // OBRIGATÓRIO para enviar e receber cookies HttpOnly
});

/**
 * Response interceptor to handle authentication errors and silent refresh
 */
api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean;
		};

		if (error.response?.status === 401) {
			const isTotvsError = originalRequest.url?.includes("/totvs/");

			if (isTotvsError) {
				console.warn(
					"TOTVS API Authentication Error - User remains logged in to platform",
				);
				return Promise.reject(error);
			}

			// Se for um erro de autenticação da plataforma e NÃO tentamos o refresh ainda
			if (!originalRequest._retry) {
				originalRequest._retry = true;

				try {
					// Chama o endpoint do Django para renovar o access_token através do cookie refresh_token
					// Usamos a instância global do axios aqui para evitar loops infinitos de interceptors
					await axios.post(
						`${api.defaults.baseURL}/api/token/refresh/`,
						{},
						{ withCredentials: true },
					);

					// Se o refresh deu certo, os novos cookies foram salvos pelo navegador.
					// Refazemos a requisição original que havia falhado por 401.
					return api(originalRequest);
				} catch (refreshError) {
					// Se a rota de refresh também falhar (401), significa que o refresh_token expirou.
					// O usuário precisa ser deslogado obrigatoriamente.
					window.location.href = "/login";
					return Promise.reject(refreshError);
				}
			}
		}
		return Promise.reject(error);
	},
);

export { api };
