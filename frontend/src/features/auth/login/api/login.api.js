import { apiClient } from "../../../../shared/api/axios.js";

/**
 * @param {{ login: string, password: string }} dto
 * @returns {Promise<{ sessionId: string }>}
 */
export const loginRequest = (dto) =>
  apiClient.post("/auth/login", dto).then((r) => r.data);
