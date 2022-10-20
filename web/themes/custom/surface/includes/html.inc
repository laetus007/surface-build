<?php

/**
 * @file
 * HTML-related hook implementations.
 */

/**
 * Implements hook_preprocess_HOOK() for HTML document templates.
 *
 * Adds body classes if certain regions have content.
 */
function surface_preprocess_html(&$variables) {
  // So fonts can be preloaded from base theme in the event Surface is used as a subtheme.
  $variables['surface_path'] = \Drupal::request()->getBasePath() . '/' . \Drupal::service('extension.list.theme')->getPath('surface');

  // Set default branding
  $site_branding = theme_get_setting('site_branding');
  if ($site_branding && $site_branding !== 'default') {
    $variables['attributes']['class'][] = 'surface--' . $site_branding;
  }
}

/**
 * Implements hook_preprocess_HOOK() for maintenance-page.html.twig.
 */
function surface_preprocess_maintenance_page(&$variables) {
  // By default, site_name is set to Drupal if no db connection is available
  // or during site installation. Setting site_name to an empty string makes
  // the site and update pages look cleaner.
  // @see template_preprocess_maintenance_page
  if (!$variables['db_is_active']) {
    $variables['site_name'] = '';
  }

  // surface has custom styling for the maintenance page.
  $variables['#attached']['library'][] = 'surface/maintenance-page';
}
