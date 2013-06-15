package models.domain.obstacle

import models.domain.core.service.Service

trait ObstacleService extends Service{
  def fetchAllOfDay: Seq[Obstacle]
}
