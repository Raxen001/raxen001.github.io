#!/bin/bash

printf "Project name: "
read name
file="index.md"

# create the leaf bundle directory
mkdir ./content/projects/"$name"

# Create a new blog post using the archetype template
hugo new ./content/projects/"$name"/"$file"

cd ./content/projects/"$name"
$EDITOR ./"$file"
