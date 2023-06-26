enum CollectionAccessStrategy {
  // /**
  //  * @description can return 0, some or all elements. Defaults to all elements in cache.
  //  */
  // ZeroOrMore,

  /**
   * @description must return at least one element if it exists.
   * Repeated usage does not guarantee distinct results.
   */
  Any,

  /**
   * @description must return all matching elements.
   * Repeated usage does not guarantee distinct results.
   */
  All,
}

export default CollectionAccessStrategy;
