<?php

/**
 * @file
 * Search-related hook implementations.
 */

/**
 * Implements hook_preprocess_search_result().
 */
function surface_preprocess_search_result(&$variables) {
  // Apply custom date formatter to "date" field.
  if (!empty($variables['result']['date'])) {
    $variables['info_date'] = \Drupal::service('date.formatter')->format($variables['result']['node']->getCreatedTime(), 'surface_medium');
  }
}
