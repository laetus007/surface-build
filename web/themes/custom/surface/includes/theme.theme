<?php

/**
 * @file
 * Functions to support theming in the Surface theme.
 */

use Drupal\surface\SurfacePreRender;

/**
 * Implements hook_element_info_alter().
 */
function surface_element_info_alter(&$info) {
  if (array_key_exists('text_format', $info)) {
    $info['text_format']['#pre_render'][] = [SurfacePreRender::class, 'textFormat'];
  }

  if (isset($info['status_messages'])) {
    $info['status_messages']['#pre_render'][] = [SurfacePreRender::class, 'messagePlaceholder'];
  }
}
