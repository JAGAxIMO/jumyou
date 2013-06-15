package models.domain.core.repository.condition

import java.util.Comparator
import models.domain.core.valueobject.ValueObject

case class Filter[T, P <: PropertyName](
  targetProperty: P,
  comparator: Comparator,
  targetValue: T
) extends ValueObject

