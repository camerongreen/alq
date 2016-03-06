<?php
/**
 * @file
 * Provides functions to import the mps, electorates and offices in to the database
 */

define('ALQ_MPS_FILE', drupal_get_path('module', 'alq_mps') . '/data/2016_QLD_Members_List.csv');
define('ALQ_ELECTORATES_FILE', drupal_get_path('module', 'alq_mps') . '/data/2016_State_Federal_Locality_Postcodes.csv');

// Friendly names for fields for the mps CVS file
$GLOBALS['mpsCvsFields'] = [
  'member' => 'MEMBER',
  'electorate' => 'ELECTORATE',
  'party' => 'PARTY',
  'address' => 'ELECTORATE/MINISTERIAL ADDRESS',
  'phone' => 'TELEPHONE/FAX NOS.',
];

/**
 * Turn the electorates CSV into a keyed hash
 *
 * @return  array[array]
 */
function alq_mps_insert_electorates() {
  if (($handle = fopen(ALQ_ELECTORATES_FILE, "r")) === FALSE) {
    die('Unable to open ' . ALQ_ELECTORATES_FILE);
  }

  // ignore header row
  $first = TRUE;
  $electorates = [];
  $electorateFields = [
    'id' => NULL,
    'lga_council' => 0,
    'lga_division' => 1,
    'state_district' => 2,
    'federal_district' => 3,
    'locality' => 4,
    'postcode' => 5,
  ];

  $query = db_insert(ALQ_ELECTORATES_TABLE)->fields(array_keys($electorateFields));

  while (($electorate = fgetcsv($handle)) !== FALSE) {
    if ($first) {
      $first = FALSE;
    }
    else {
      $electorateInsert = [];

      foreach ($electorateFields as $field => $index) {
        if ($index === NULL) {
          $electorateInsert[$field] = $index;
        }
        else {
          $electorateInsert[$field] = $electorate[$index];
        }
      }

      $query->values($electorateInsert);
    }
  }

  if (!$query->execute()) {
    die('Unable to insert electorates - ' . var_dump($electorates, TRUE));
  }
}

/**
 * Parse the mps data and insert into db
 *
 * @param  array $mps
 * @return  array
 */
function alq_mps_insert($mps) {
  $query = db_insert(ALQ_MPS_TABLE)->fields(array_keys($GLOBALS['mpsFields']));
  $officeQuery = db_insert(ALQ_ELECTORAL_OFFICES_TABLE)->fields(array_keys($GLOBALS['officeFields']));

  foreach ($mps as $mp) {
    $mpInsert = $GLOBALS['mpsFields'];
    $mpInsert['type'] = 'State'; // hard code for first iteration

    // simple fields that can be passed straight through
    foreach (['electorate', 'party'] as $field) {
      $mpInsert[$field] = $mp[$GLOBALS['mpsCvsFields'][$field]];
    }

    // parse name, title etc from member details
    $member = $mp[$GLOBALS['mpsCvsFields']['member']];

    $title = alq_mps_parse_title($member);
    if ($title) {
      $member = preg_replace('/\s*\[[^\]]+\]/', '', $member);
    }

    $rawValues = explode("\n", $member);

    $mpInsert['name'] = array_shift($rawValues);
    $mpInsert['position'] = count($rawValues) > 0 ? implode("\n", $rawValues) : NULL;
    $mpInsert['title'] = $title;

    // parse all the address details into a useful form
    $address = $mp[$GLOBALS['mpsCvsFields']['address']];
    $phone = $mp[$GLOBALS['mpsCvsFields']['phone']];

    $officeDetails = alq_mps_parse_office_details($GLOBALS['officeFields'], $address, $phone);

    foreach ($officeDetails as $office) {
      $office['electorate'] = $mpInsert['electorate'];
      $officeQuery->values($office);
    }

    $mpInsert['created'] = time();
    $query->values($mpInsert);
  }

  if (!$query->execute()) {
    die('Unable to insert mps - ' . var_dump($mps, TRUE));
  }

  if (!$officeQuery->execute()) {
    die('Unable to insert offices');
  }
}

/**
 * Parse for title, it appears in a string as [Miss] etc.
 * if not present return Mr which seems to be default
 *
 * @param $value
 * @return string|null
 */
function alq_mps_parse_title($value) {
  $matches = NULL;
  if (preg_match('/\[([^\]]+)\]/', $value, $matches)) {
    return $matches[1];
  }
  return 'Mr';
}

/**
 * Parse for office details in the address and phone numbers strings
 * is unstructured data, so not that simple
 *
 * @param array $officeFields
 * @param string $address
 * @param string $phone
 * @return array|false
 */
function alq_mps_parse_office_details($officeFields, $address, $phone) {
  $return_val = []; // return an array of office details arrays
  $emails = [];
  $addresses = [];

  $officeInsert = $officeFields;
  $officeInsert['created'] = time();

  $addressValues = explode("\n", $address);

  for ($i = 0, $l = count($addressValues); $i < $l; $i++) {
    $value = $addressValues[$i];

    $parts = explode(':', $value);

    // If a line has a colon it is treated specially, anything else is an
    // address.  The special cases where lines have a colon seem to be:
    // 1. MP has two offices and it says something like "Barrier reef office:"
    //    followed by the address on the next line/s
    // 2. MP is a minister and has a ministerial office address "Ministerial: address..."
    // 3. Lists an email address for the office "Email: noam@chom.sky"

    // line has colon
    if (count($parts) > 1) {
      $start = trim(array_shift($parts));
      $end = trim(implode(':', $parts));

      if ($start === 'Email') {
        $emails[] = $end;
      }
      else {
        // If it's not an email, the other two colon fields mean we are
        // starting on a new address, so if we already have an address
        // in our buffers, add it to the return val and start a new one
        if (count($addresses) > 0) {
          // store current address
          $officeInsert['address'] = implode("\n", $addresses);
          $officeInsert['email'] = implode(',', $emails);
          $officeInsert['state'] = 'QLD'; // hard code for first iteration
          $return_val[] = $officeInsert;

          // start new address
          $emails = [];
          $addresses = [];
          $officeInsert = $officeFields;
          $officeInsert['created'] = time();
        }

        if ($start === 'Ministerial') {
          $officeInsert['type'] = $start;
          $addresses[] = $end;
        }
        else {
          if ($end === '') {
            $officeInsert['type'] = $start;
          }
          else {
            $addresses[] = trim($value);
          }
        }
      }
    }
    else {
      // addresses often end with multiple emails, so if we've seen one
      // email it means any further lines are emails
      // otherwise if we haven't tack it on to address
      if (count($emails) > 0) {
        $emails[] = trim($value);
      }
      else {
        $addresses[] = trim($value);
      }
    }
  }

  // store the address
  $officeInsert['address'] = implode("\n", $addresses);
  $officeInsert['email'] = implode(',', $emails);
  $officeInsert['state'] = 'QLD'; // hard code for first iteration
  $return_val[] = $officeInsert;

  // now we need to parse the phone numbers
  $phoneValues = explode("\n", $phone);
  $phone_nums = 0;

  foreach ($phoneValues as $line) {
    $parts = explode(':', $line);

    // Phones and faxes have an identifier (Ph, Fax) and a colon at the start
    // anything else thus far is a toll free number, or useless text
    if (count($parts) > 1) {
      $start = trim(array_shift($parts));
      $end = trim(implode(':', $parts));

      if ($start === 'Ph') {
        if (!empty($return_val[$phone_nums]['phone'])) {
          $phone_nums++;
        }
        $return_val[$phone_nums]['phone'] = $end;
      }
      else {
        if ($start === 'Fax') {
          $return_val[$phone_nums]['fax'] = $end;
        }
      }
    }
    else {
      // parse out the toll free numbers, ignores anything else
      if (preg_match('/1800 .*/', $line)) {
        $return_val[$phone_nums]['toll_free_phone'] = trim($line);

      }
    }
  }

  return $return_val;
}

/**
 * Gets the raw data from the CSV, adding columns together
 * to finish with one mp per row
 *
 * @return array[array]
 */
function alq_mps_get_raw() {
  if (($handle = fopen(ALQ_MPS_FILE, "r")) === FALSE) {
    die('Unable to open ' . ALQ_MPS_FILE);
  }

  $headers = NULL;
  $return_val = [];
  $mp_buffer = [];

  while (($mp = fgetcsv($handle)) !== FALSE) {
    if (is_null($headers)) {
      $headers = $mp;
    }
    else {
      if (alq_mps_empty_row($mp)) {
        $return_val[] = $mp_buffer;
        $mp_buffer = [];
      }
      else {
        for ($i = 0; $i < count($headers); $i++) {
          $value = trim($mp[$i]);
          if ($value !== '') {
            if (array_key_exists($headers[$i], $mp_buffer)) {
              $mp_buffer[$headers[$i]] .= "\n" . $value;
            }
            else {
              $mp_buffer[$headers[$i]] = $value;
            }
          }
        }
      }
    }
  }

  if (!empty($mp_buffer)) {
    $return_val[] = $mp_buffer;
  }

  return $return_val;
}

/**
 * Check if a csv row is empty
 *
 * @param $csvArray
 * @return bool
 */
function alq_mps_empty_row($csvArray) {
  foreach ($csvArray as $field) {
    if (trim($field) !== '') {
      return FALSE;
    }
  }
  return TRUE;
}
