export const igLoggedIn = profile => ({
  type: 'IG_LOGGED_IN',
  profile: {
    ...profile
  }
});

export const igLoggedOut = _ => ({
  type: 'IG_LOGGED_OUT'
});