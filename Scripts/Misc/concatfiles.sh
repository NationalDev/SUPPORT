#!/bin/bash

#Must be used from INCLUDES_CUSTOM directory

mv "INCLUDES_CUSTOM.js" "~INCLUDES_CUSTOM.js"
echo "" > merged.tmp
for i in *.js ; do

cat "$i" >> merged.tmp
echo "" >> merged.tmp
done

mv merged.tmp INCLUDES_CUSTOM.js
