#!/bin/bash
# Note this doesn't touch the database, it just removes all
# code
PUBLIC_DIR=public_html
chmod 755 ${PUBLIC_DIR}/sites/default
rm -fr ${PUBLIC_DIR}
