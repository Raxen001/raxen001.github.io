#!/bin/bash

# Find the highest numbered blog post
latest=$(ls -r content/projects/project* | grep -oE '[0-9]+' | sort -n | tail -1)

# Calculate the next blog number
next=$((latest + 1))

# Create a new blog post using the archetype template
hugo new projects/project-$next.md

nvim /content/projects/project-$next.md
