<?php

/**
 * @file
 * Views-related hook implementations.
 */

use Drupal\views\ViewExecutable;

/**
 * Implements hook_preprocess_HOOK().
 */
function surface_preprocess_views_view(array &$variables) {
  $variables['path'] = $variables['view']->getRequest()->getPathInfo();
  $variables['get'] = $variables['view']->getExposedInput();
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function surface_theme_suggestions_views_view_alter(array &$suggestions, array $variables) {
  $view = $variables['view'];
  $suggestions[] = 'views_view__' . $view->id();
  $suggestions[] = 'views_view__' . $view->current_display;
  $suggestions[] = 'views_view__' . $view->id() . '__' . $view->current_display;
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function surface_theme_suggestions_views_view_unformatted_alter(array &$suggestions, array $variables) {
  $view = $variables['view'];
  $suggestions[] = 'views_view_unformatted__' . $view->id();
  $suggestions[] = 'views_view_unformatted__' . $view->current_display;
  $suggestions[] = 'views_view_unformatted__' . $view->id() . '__' . $view->current_display;
}

/**
 * Implements hook_views_pre_render().
 */
function surface_views_pre_render(ViewExecutable $view) {
  $add_classes = function (&$option, array $classes_to_add) {
    $classes = preg_split('/\s+/', $option);
    $classes = array_filter($classes);
    $classes = array_merge($classes, $classes_to_add);
    $option = implode(' ', array_unique($classes));
  };

  if ($view->id() === 'media_library') {
    if ($view->display_handler->options['defaults']['css_class']) {
      $add_classes($view->displayHandlers->get('default')->options['css_class'], ['media-library-view']);
    }
    else {
      $add_classes($view->display_handler->options['css_class'], ['media-library-view']);
    }

    if ($view->current_display === 'page') {
      if (array_key_exists('media_bulk_form', $view->field)) {
        $add_classes($view->field['media_bulk_form']->options['element_class'], ['media-library-item__click-to-select-checkbox']);
      }
      if (array_key_exists('rendered_entity', $view->field)) {
        $add_classes($view->field['rendered_entity']->options['element_class'], ['media-library-item__content']);
      }
      if (array_key_exists('edit_media', $view->field)) {
        $add_classes($view->field['edit_media']->options['alter']['link_class'], ['media-library-item__edit']);
        $add_classes($view->field['edit_media']->options['alter']['link_class'], ['icon-link']);
      }
      if (array_key_exists('delete_media', $view->field)) {
        $add_classes($view->field['delete_media']->options['alter']['link_class'], ['media-library-item__remove']);
        $add_classes($view->field['delete_media']->options['alter']['link_class'], ['icon-link']);
      }
    }
    elseif (strpos($view->current_display, 'widget') === 0) {
      if (array_key_exists('rendered_entity', $view->field)) {
        $add_classes($view->field['rendered_entity']->options['element_class'], ['media-library-item__content']);
      }
      if (array_key_exists('media_library_select_form', $view->field)) {
        $add_classes($view->field['media_library_select_form']->options['element_wrapper_class'], ['media-library-item__click-to-select-checkbox']);
      }

      if ($view->display_handler->options['defaults']['css_class']) {
        $add_classes($view->displayHandlers->get('default')->options['css_class'], ['media-library-view--widget']);
      }
      else {
        $add_classes($view->display_handler->options['css_class'], ['media-library-view--widget']);
      }
    }
  }
}

/**
 * Implements hook_preprocess_views_view_fields().
 *
 * This targets each rendered media item in the grid display of the media
 * library's modal dialog.
 */
function surface_preprocess_views_view_fields__media_library(array &$variables) {
  // Add classes to media rendered entity field so it can be targeted for styling. Adding this class in a template is very difficult to do.
  if (isset($variables['fields']['rendered_entity']->wrapper_attributes)) {
    $variables['fields']['rendered_entity']->wrapper_attributes->addClass('media-library-item__click-to-select-trigger');
  }
}
