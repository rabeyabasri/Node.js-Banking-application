async function testFun() {
  let { username_, email_, password_, signup_ } = q_s(`.signupForm`);
  signup_.value = `signing up..`;

  let username = username_.value;
  let email = email_.value;
  let password = password_.value;

  let signupInfo = await post_FTC("user/signup", {
    username,
    email,
    password,
  });

  let { url } = signupInfo;

  if (url === "user/login") {
    get_html_Page_(q_sa(".header ul li a")[1], "loginForm", null, 1);
  } else {
    handle_error(signupInfo);
    signup_.value = `Signup`;
  }
}
