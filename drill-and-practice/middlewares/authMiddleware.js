const authMiddleware = (context, next) => {
  if (context.state.session.get('authenticated') === true) {
    // User is authenticated, allow access to the next route
    return next();
  }

  // User is not authenticated, redirect to the login page
  context.response.redirect('/auth/login');
};

export {authMiddleware}