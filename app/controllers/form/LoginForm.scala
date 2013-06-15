package controllers.form

import play.api.data.Form
import play.api.data.Forms._
import models.domain.user.UserService
import models.infra.user.UserServiceImpl

object LoginForm {
  private val userService = new UserServiceImpl
  def loginForm: Form[(String, String)] = Form(tuple(
    "mailAddress" -> email,
    "password" -> nonEmptyText
  ) verifying("hoge", form => form match{
    case (address, pass) => userService.authenticate(address, pass)
  }))

}
