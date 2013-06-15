package models.core

import models.domain.user.UserService
import models.infra.user.UserServiceImpl

object ServiceLocator {
  def userService: UserService = new UserServiceImpl
}
