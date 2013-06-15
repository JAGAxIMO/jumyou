package models.infra.user

import org.specs2.mutable.Specification
import models.domain.user.{User, UserRepository}

class UserServiceImplSpec extends Specification{
  val userService = new UserServiceImplForTest
  "authenticate" should {
    "にんしょうおっけー" in {
      userService.authenticate("yoshiki@jumyou.com", "ringo") must beTrue
    }
    "認証できなかった" in{
      userService.authenticate("yoshiki@jumyou.com", "hoge") must beFalse
    }
  }
}

class UserServiceImplForTest extends UserServiceImpl{
  override protected val mysqlRepository: UserRepository = new UserMysqlRepositoryMock
}

class UserMysqlRepositoryMock extends UserRepository{
  def fetch(mailAddress: String): Option[User] = Some(User(
    1, "yoshiki", "yoshiki@jumyou.com", "8618b88786eeffa7b153c2c1c89539b4cd014e0aa2d60d81d4085d2b1898158e", 85
  ))
}

