#!/bin/bash

# depends on : hugo 

declare -A types
prompt="=> "
path_to_thumb="./assets/default/thumbnail.png"
types=([1]="personal_writing" [2]='projects' [3]='blog')
help=$'[1]: WRITES
[2]: PROJECTS
[3]: BLOGS'

help() {
  echo "$help"
  echo -n "$prompt"
}


sel() {
  help
  read option
}

run() {
  echo -n "ENTER NAME: ""$prompt"
  read name
  #mkdir ./content/"${types[${option}]}"/"$name"
  hugo new ./content/"${types[${option}]}"/"$name"/index.md
  cp "$path_to_thumb" ./content/"${types[${option}]}"/"$name"/thumbnail.png
  cd ./content/"${types[${option}]}"/"$name"/
}

main() {
  while true;
  do
    case $option in 
      1|2|3) run; break;;
      *) sel;;
    esac
  done
}

main

