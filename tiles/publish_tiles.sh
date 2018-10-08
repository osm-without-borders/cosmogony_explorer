#! /bin/bash
# publish tiles to b able to import new data without any downtime
set -ev

base_dir="/tmp/mvtcache"
import_dir="$base_dir/import_cosmogony"
serve_dir="$base_dir/cosmogony"
backup_dir="$base_dir/backup"

if [ -d $serve_dir ]; then
    if [ -d $backup_dir ]; then
        rm -r $backup_dir
    fi
    mv $serve_dir $backup_dir
fi

mv $import_dir $serve_dir
