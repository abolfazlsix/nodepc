export function goProfile(nav, user) {
  if (!user) {
    nav("/no-account");
  } else {
    nav(`/profile/${user.username}`);
  }
}
