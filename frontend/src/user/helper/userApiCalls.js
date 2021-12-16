import { API } from "../../backend";

export const signup = (user) => {
    return fetch(`${API}/users/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

export const signin = (user) => {
    const formData = new FormData();

    for (const name in user) {
        console.log(user[name]);
        formData.append(name, user[name]);
    }

    for (var key of formData.keys()) {
        console.log("KEY", key)
    }

    return fetch(`${API}/users/login/`, {
        method:"POST",
        body: formData,
    })
    .then((response) => {
        console.log("Login Successfull")
        return response.json()
    })
    .catch((error) => console.log(error))
}

export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
      localStorage.setItem("jwt", JSON.stringify(data));
      next();
    }
  };

export const isAuthenticated = () => {
    if (typeof window == undefined) {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"))
    } else {
      return false;
    }
  }

export const signout = () => {
  const userId = isAuthenticated().user.id;
  console.log("ID", userId);

  localStorage.removeItem("jwt");

  return fetch(`${API}/users/logout/${userId}/`, {
    method:"GET",
  })
  .then((response) => {
    console.log("Signout Successful");
  })
  .catch((error) => console.log(error))

}
