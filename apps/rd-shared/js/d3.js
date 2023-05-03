// Misc methods for D3 components


// validateNumRange
// Vue validator for floats. If false, the supplied value is not between 0 and 1
//
// @return boolean
export function validateNumRange (value) {
  return value >= 0 && value <= 1
}