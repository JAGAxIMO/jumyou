package models.domain.core.repository.condition

object Comparator extends Enumeration {
  type Comparator = Value
  val LessThan, LessOrEqual, Equals, GreaterOrEqual, GreaterThan = Value
}
