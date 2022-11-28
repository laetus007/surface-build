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
  if (isset($form_id)) {
    return;
  }

  // Disable theme settings
  $form['theme_settings'] = [
    '#access' => FALSE,
  ];

  // Disable logo
  // $form['logo'] = [
  //   '#access' => FALSE,
  // ];

  // Disable favicon
  // $form['favicon'] = [
  //   '#access' => FALSE,
  // ];

  $form['surface_settings']['branding'] = [
    '#type' => 'details',
    '#title' => t('Surface branding'),
  ];

  $form['surface_settings']['branding']['site_branding'] = [
    '#type' => 'select',
    '#title' => t('Site branding'),
    '#options' => [
      'default' => t('Default'),
      'dgsom' => t('DGSOM'),
      'labs' => t('Labs'),
    ],
    '#default_value' => theme_get_setting('site_branding'),
  ];

  $form['surface_settings']['branding']['site_menu'] = [
    '#type' => 'select',
    '#title' => t('Site menu'),
    '#options' => [
      'default' => t('Default'),
      'mega' => t('Megamenu')
    ],
    '#default_value' => theme_get_setting('site_menu'),
  ];

  $form['surface_settings']['logos'] = [
    '#type' => 'details',
    '#title' => t('Surface logos'),
  ];

  $form['surface_settings']['logos']['header_logo'] = [
    '#type' => 'managed_file',
    '#title' => t('Header logo'),
    '#upload_location' => 'public://logos',
    '#upload_validators' => [
      'file_validate_extensions' => [
        'svg'
      ],
    ],
    '#default_value'  => theme_get_setting('header_logo'),
  ];

  $form['surface_settings']['logos']['footer_logo'] = [
    '#type' => 'managed_file',
    '#title' => t('Footer logo'),
    '#upload_location' => 'public://logos',
    '#upload_validators' => [
      'file_validate_extensions' => [
        'svg'
      ],
    ],
    '#default_value'  => theme_get_setting('footer_logo'),
  ];
}
