package controllers

import play.api.mvc.{Security, Action, Controller}
import controllers.form.LoginForm

object Auth extends Controller{


  def login = Action { implicit request =>
    Ok(views.html.auth.login(LoginForm.loginForm))
  }

  def authenticate = Action { implicit request =>
    LoginForm.loginForm.bindFromRequest.fold(
      errors => Redirect(routes.Auth.login()),
      user => Redirect(routes.Index.index).withSession(Security.username -> user._1)
    )
  }
}
