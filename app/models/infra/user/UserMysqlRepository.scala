package models.infra.user

import models.domain.user.{User, UserRepository}
import play.api.db.DB
import anorm._
import anorm.SqlParser._
import play.api.Play.current

class UserMysqlRepository extends UserRepository{
  def fetch(mailAddress: String): Option[User] = DB.withConnection{ implicit connection =>
    connection.setReadOnly(true)
    SQL("SELECT * FROM users WHERE mailAddress={mailAddress}").on(
      'mailAddress -> mailAddress
    ).as(toUser.singleOpt)
  }
  private val toUser = int("id")~str("name")~str("mailAddress")~str("password")~int("age") map {
    case id~name~mailAddress~password~age => User(
      id, name, mailAddress, password, age
    )
  }
}
