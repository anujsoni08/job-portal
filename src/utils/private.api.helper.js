import { privateAxiosInstance } from "./api";

export async function getRecruiterPostedJobList() {
  return await privateAxiosInstance.get("recruiters/jobs");
}

export async function getSingleJobCandidateList(jobId) {
  return await privateAxiosInstance.get(`recruiters/jobs/${jobId}/candidates`);
}

export async function applyCandidateJob(params) {
  return await privateAxiosInstance.post("candidates/jobs", params);
}

export async function getAvailableJobList() {
  return await privateAxiosInstance.get("candidates/jobs");
}

export async function getCandidateAlreadyAppliedJobList() {
  return await privateAxiosInstance.get("candidates/jobs/applied", {});
}

export async function getJobDetail(jobId) {
  return await privateAxiosInstance.get(`jobs/${jobId}`, {});
}

export async function createJob(params) {
  return await privateAxiosInstance.post("jobs", params);
}

export async function deleteJob(params) {
  return await privateAxiosInstance.delete("jobs", params);
}
