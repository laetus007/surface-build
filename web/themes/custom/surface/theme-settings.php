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
  $theme_file = drupal_get_path('theme', 'surface') . '/surface.theme';
  $build_info = $form_state->getBuildInfo();
  if (!in_array($theme_file, $build_info['files'])) {
    $build_info['files'][] = $theme_file;
  }
  $form_state->setBuildInfo($build_info);
  $form['#submit'][] = 'surface_form_system_theme_settings_submit';

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

  $form['surface_settings']['settings'] = [
    '#type' => 'details',
    '#title' => t('Surface settings'),
  ];

  $form['surface_settings']['settings']['site_theme'] = [
    '#type' => 'select',
    '#title' => t('Site theme'),
    '#options' => [
      'default' => t('Default'),
      'dgsom' => t('DGSOM'),
      'labs' => t('Labs'),
    ],
    '#default_value' => theme_get_setting('site_theme'),
  ];

  $form['surface_settings']['settings']['site_menu'] = [
    '#type' => 'select',
    '#title' => t('Site menu'),
    '#options' => [
      'default' => t('Default'),
      'dropdown' => t('Dropdown'),
      'mega' => t('Megamenu')
    ],
    '#default_value' => theme_get_setting('site_menu'),
  ];

  $form['surface_settings']['settings']['header_logo'] = [
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

  $form['surface_settings']['settings']['footer_logo'] = [
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

function surface_form_system_theme_settings_submit(&$form, FormStateInterface $form_state) {
  $values = $form_state->getValues();

  // Save header logo
  if (!empty($values['header_logo'])) {
    $file = \Drupal\file\Entity\File::load($values['header_logo'][0]);
    if ($file->isTemporary()) {
      $file->setPermanent();
      $file->save();
    }
  }else{

  }
}
