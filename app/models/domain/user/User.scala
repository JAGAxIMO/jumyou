package models.domain.user

import models.domain.core.entity.Entity

case class User(
  id:Int,
  name: String,
  mailAddress: String,
  password: String,
  age: Int
) extends Entity[Int]
