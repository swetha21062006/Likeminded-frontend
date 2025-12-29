import { api } from "./api";

class ProblemService {
  async getProblems(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    return api.get(`/problems?${queryString}`);
  }

  async getProblemById(id) {
    return api.get(`/problems/${id}`);
  }

  async createProblem(problemData) {
    return api.post("/problems", problemData);
  }

  async updateProblem(id, problemData) {
    return api.put(`/problems/${id}`, problemData);
  }

  async deleteProblem(id) {
    return api.delete(`/problems/${id}`);
  }

  async getProblemsByVendor(vendorId) {
    return api.get(`/problems/vendor/${vendorId}`);
  }

  async submitSolution(problemId, solutionData) {
    return api.post(`/problems/${problemId}/solutions`, solutionData);
  }

  async getSolutions(problemId) {
    return api.get(`/problems/${problemId}/solutions`);
  }

  async reviewSolution(solutionId, reviewData) {
    return api.post(`/solutions/${solutionId}/review`, reviewData);
  }

  async uploadFiles(problemId, formData) {
    return api.upload(`/problems/${problemId}/upload`, formData);
  }
}

export const problemService = new ProblemService();
