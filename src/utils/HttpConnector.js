/**
 *  generic file for all fetch related opertaions
 */

import { getToken } from "./TokenUtil";

const baseUrl = "/api/v1";
export const getGenres = () => {
  return fetch(baseUrl + "/genres", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  })
    .then((response) => response.json())
    .catch(() => {
      new Error("Error while getting genres list");
    });
};

export const getArtists = () => {
  return fetch(baseUrl + "/artists?page=1&limit=10000", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  })
    .then((response) => response.json())
    .catch(() => {
      new Error("Error while getting artists list");
    });
};

export const getMovies = (filter = {}) => {
  const queryParams = Object.keys(filter)
    .map((key) => key + "=" + filter[key])
    .join("&");
  return fetch(baseUrl + `/movies?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  })
    .then((response) => response.json())
    .catch(() => {
      new Error("Error while getting movies list");
    });
};

export const getMovieDetail = (id) => {
  return fetch(baseUrl + `/movies/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  })
    .then((response) => response.json())
    .catch(() => {
      new Error("Error while getting movies details");
    });
};

export const getMovieShowDetails = (id, dataShows) => {
  return fetch(baseUrl + `/movies/${id}/shows`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    body: dataShows,
  })
    .then((response) => response.json())
    .catch(() => {
      new Error("Error while getting movies show details");
    });
};

export const bookTicket = (data) => {
  return fetch(baseUrl + `/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + getToken(),
    },
    body: data,
  })
    .then((response) => response.json())
    .catch(() => {
      new Error("Error while saving booking details");
    });
};

export const login = (formData) => {
  return fetch(baseUrl + `/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: `Basic ${btoa(
        `${formData.username}:${formData.password}`
      )}`,
    },
  });
};

export const registerAccount = (formData) => {
  return fetch(baseUrl + `/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify(formData),
  });
};
