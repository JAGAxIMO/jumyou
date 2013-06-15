package models.domain.core.repository.condition

import org.springframework.core.annotation.Order


case class FetchCondition[P <: PropertyName](
  limit: Int,
  offset: Int,
  sort: P,
  order: Order,
  filterList: List[Filter[_, P]]
)
