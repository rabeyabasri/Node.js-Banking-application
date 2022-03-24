const q_s = (e) => document.querySelector(e);
const q_sa = (e) => document.querySelectorAll(e);

const msg_load = () =>
  (q_s(".inside_app").innerHTML = `<p class="d6">loading..</p>`);

const setInitAppHeight = () => {
  let set_app_height = q_s("body").clientHeight - q_s(".header").clientHeight;
  q_s(".app").style["height"] = `${set_app_height}px`;
};

const hideNavLinks = (e) => {
  if (e === 0) {
    q_sa(".header ul li a").forEach((itm, i) => {
      itm.style["display"] = `none`;
    });
  } else {
    q_sa(".header ul li a").forEach((itm, i) => {
      itm.style["display"] = `block`;
    });
  }
};

const reset_NavLinksColor = (target) => {
  if (target !== 1) {
    hideNavLinks(1);
    let tr_attr = target.getAttribute("href");

    q_sa(".header ul li a").forEach((itm) => {
      let itm_attr = itm.getAttribute("href");

      itm_attr === tr_attr
        ? (itm.style["color"] = `#f2f7fa`)
        : (itm.style["color"] = `#cbcccc`);
    });
  } else {
    hideNavLinks(0);
  }
};

const get_html_FTC = async (url) => {
  try {
    let res = await fetch(url);
    if (res.ok) {
      let out_data = await res.text();
      return out_data;
    } else {
      throw Error("can't get_FTC");
    }
  } catch ({ message }) {
    return message && null;
  }
};

const get_FTC = async (url) => {
  try {
    let res = await fetch(url);
    if (res.ok) {
      let out_data = await res.json();
      return out_data;
    } else {
      throw Error(`can't get ${res.url}`);
    }
  } catch ({ message }) {
    return message;
  }
};

const post_FTC = async (url, data) => {
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let out_data = await res.json();
  return out_data;
};

const get_html_Page_ = async (target, get, msg, getScript) => {
  msg_load();
  reset_NavLinksColor(target);
  let signupForm, script_;

  if (get) {
    signupForm = await get_html_FTC(`../html/${get}.html`);
  } else {
    signupForm = msg;
  }

  getScript &&
    ((script_ = document.createElement("script")),
    (script_[`src`] = `../js/htmlPagesJs/${get}.js`),
    script_.setAttribute(`defer`, ``));

  q_s(".inside_app").innerHTML = `${signupForm}`;
  script_ && q_s(".inside_app").appendChild(script_);
};

const setDashboardData = (div, user) => {
  div.childNodes.forEach((cld) => {
    if (cld.nodeName === "P") {
      if (cld.childNodes[1].nodeName === "SPAN") {
        let slc = cld.childNodes[1];
        let spn_clss = cld.childNodes[1].classList[0];

        slc.textContent = user[spn_clss];
      }
    }
  });
};

const getUserInfo = async () => {
  let data = await get_FTC("show_users");
  let { url, user } = data;

  if (url === "show_users") {
    return user;
  } else {
    return false;
  }
};

const handle_error = (error) => {
  for (const k in error) {
    if (Object.hasOwnProperty.call(error, k)) {
      const el = error[k];

      q_s(`.signupForm`)[`${k}_`] &&
        (q_s(`.signupForm`)[`${k}_`].nextElementSibling.textContent = el);
    }
  }
};

const enRoute = (route, target) => {
  if (route === "/") {
    get_html_Page_(target, "homePage", null, 1);
  }

  if (route === "user/signup") {
    get_html_Page_(1, "signupForm", null, 1);
  }

  if (route === "user/login") {
    get_html_Page_(target, "loginForm", null, 1);
  }

  if (route === "user/api") {
    get_html_Page_(1, "apiPage");
  }

  if (route === "user/testapi") {
    get_html_Page_(1, "testApiPage", null, 1);
  }
};

q_sa(".header ul li a").forEach((itm) => {
  itm.addEventListener("click", (e) => {
    e.preventDefault();
    let route = e.target.getAttribute("href");

    enRoute(route, e.target);
  });
});

q_s(".inside_app").addEventListener("click", (e) => {
  e.preventDefault();
  let tr = e.target;

  if (tr.nodeName === "A") {
    let route = tr.getAttribute("href");

    enRoute(route, tr);
  }
});

//init
hideNavLinks(0);
msg_load();
(async () => {
  let data = await get_FTC("show_users");
  let { url, user } = data;

  if (url === "show_users") {
    await get_html_Page_(1, "userDashboard", null, 1);
    setDashboardData(q_s(".dashboard div:nth-child(1)"), user);
  } else {
    get_html_Page_(q_sa(".header ul li a")[0], "homePage", null, 1);
  }
  //set height
  setInitAppHeight();
})();
