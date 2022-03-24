async function testFun() {
  let { email_, password_, login_ } = q_s(`.signupForm`);
  login_.value = `logging in..`;

  let email = email_.value;
  let password = password_.value;

  let loginInfo = await post_FTC("user/login", {
    email,
    password,
  });

  let { url, user } = loginInfo;

  if (url === "show_users") {
    await get_html_Page_(1, "userDashboard", null, 1);
    setDashboardData(q_s(".dashboard div:nth-child(1)"), user);
  } else {
    handle_error(loginInfo);
    login_.value = `Login`;
  }
}
