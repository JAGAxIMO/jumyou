package models.infra.user

import models.domain.user.{UserRepository, UserService}
import java.security.MessageDigest

class UserServiceImpl extends UserService{
  protected val mysqlRepository: UserRepository = new UserMysqlRepository
  def authenticate(mailAddress: String, password: String): Boolean = mysqlRepository.fetch(mailAddress) match {
    case None => false
    case Some(user) => user.password match {
      case pass if pass == MessageDigest.getInstance("SHA-256")
        .digest((password + mailAddress).getBytes).map("%02x".format(_)).mkString =>true
      case _ => false
    }
  }
}
