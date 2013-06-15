package models.domain.user

import models.domain.core.repository.Repository

trait UserRepository extends Repository{
  def fetch(mailAddress: String): Option[User]
}
