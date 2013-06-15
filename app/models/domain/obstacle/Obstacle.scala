package models.domain.obstacle

import models.domain.core.entity.Entity

case class Obstacle(
  id: Int,
  decription: String
) extends Entity[Int]
