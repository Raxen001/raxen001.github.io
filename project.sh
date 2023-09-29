#!/bin/bash

printf "Project name: "
read file_name
file="$file_name".md

# Create a new blog post using the archetype template
hugo new ./content/projects/"$file"

$EDITOR ./content/projects/"$file"
