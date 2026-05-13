import axios from "axios";

export function getBackendUrl() {
	return process.env.NEXT_PUBLIC_BACKEND_URL || "https://scholarchain-production.up.railway.app";
}

export function getToken() {
	if (typeof window === "undefined") return "";
	return localStorage.getItem("scholarchain_token") || "";
}

export function setToken(token) {
	if (typeof window === "undefined") return;
	if (!token) localStorage.removeItem("scholarchain_token");
	else localStorage.setItem("scholarchain_token", token);
}

export function getTokenPayload() {
	const token = getToken();
	if (!token) return null;

	try {
		const parts = token.split(".");
		if (parts.length < 2) return null;
		const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
		const padded = payloadBase64 + "=".repeat((4 - (payloadBase64.length % 4)) % 4);
		const payloadString = atob(padded);
		return JSON.parse(payloadString);
	} catch {
		return null;
	}
}

export const api = axios.create({
	baseURL: getBackendUrl(),
	headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
	const token = getToken();
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

