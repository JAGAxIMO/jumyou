package controllers

import play.api.mvc._

trait UserSession {

  def mailAddress(request: RequestHeader) = request.session.get(Security.username)

  def onUnauthorized(request: RequestHeader) = Results.Redirect(routes.Auth.login())

  def withAuth(f: String => Request[AnyContent] => Result) = {
    Security.Authenticated(mailAddress, onUnauthorized) { user =>
      Action(request => f(user)(request))
    }
  }

}
