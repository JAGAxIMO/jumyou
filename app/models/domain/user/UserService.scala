package models.domain.user

import models.domain.core.service.Service

trait UserService extends Service{
  def authenticate(mailAddress: String, password: String): Boolean
}
