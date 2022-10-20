<?php

/**
 * @file
 * Media-related hook implementations.
 */

/**
 * Implements hook_preprocess_HOOK() for setting classes.
 */
function surface_preprocess_filter_caption(&$variables) {
  $variables['classes'] = isset($variables['classes']) && !empty($variables['classes']) ? $variables['classes'] . ' caption' : 'caption';
}
