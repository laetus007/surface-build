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

  // Set default theme
  $site_theme = theme_get_setting('site_theme');
  if ($site_theme && $site_theme !== 'default') {
    $variables['attributes']['class'][] = 'surface--' . $site_theme;
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

function surface_preprocess(&$variables) {
  // Get menu type
  $menu_type = theme_get_setting('site_menu');
  if ($menu_type && $menu_type !== 'default') {
    $variables['menu_class'] = $menu_type;
  }

  // Set header logo
  $file_id = theme_get_setting('header_logo');

  if ($file_id) {
    $file = $file = \Drupal\file\Entity\File::load($file_id[0]);

    if($file) {
      $uri = $file->getFileUri();
      $url = \Drupal\Core\Url::fromUri(file_create_url($uri))->toString();
      $variables['header_logo'] = $url;
    }
  }
}
