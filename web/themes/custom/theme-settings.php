<?php

/**
 * @file
 * Functions to support Surface theme settings.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_FORM_ID_alter() for system_theme_settings.
 */
function surface_form_system_theme_settings_alter(&$form, FormStateInterface $form_state) {
  $form['surface_settings']['surface_branding'] = [
    '#type' => 'fieldset',
    '#title' => t('Surface branding'),
  ];

  $form['surface_settings']['surface_branding']['site_branding'] = [
    '#type' => 'select',
    '#title' => t('Site branding'),
    '#options' => [
      'default' => t('Default'),
      'dgsom' => t('DGSOM'),
      'labs' => t('Labs'),
    ],
    '#default_value' => theme_get_setting('site_branding'),
  ];
}
